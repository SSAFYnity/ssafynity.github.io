import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { staticRoutes } from './astro-route-manifest.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const workspaceRoot = path.resolve(projectRoot, '..')

const currentRoot = projectRoot
const currentSrc = path.join(currentRoot, 'src')
const currentData = path.join(currentSrc, 'site', 'data')
const currentPublic = path.join(currentRoot, 'public')
const distRoot = path.join(currentRoot, 'dist')

const eventsDir = path.join(currentData, 'events')
const clubsDir = path.join(currentData, 'clubs')
const allowedPublicExtraOnRight = new Set(['404.html'])

function createComparisonRoot(rootPath) {
  return {
    root: rootPath,
    src: path.join(rootPath, 'src'),
    data: path.join(rootPath, 'src', 'site', 'data'),
    public: path.join(rootPath, 'public'),
  }
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function resolveComparisonRoot() {
  const siblingRenewalRoot = path.join(workspaceRoot, 'ssafynity-renewal')
  if (path.resolve(siblingRenewalRoot) === path.resolve(currentRoot)) {
    return null
  }

  const candidate = createComparisonRoot(siblingRenewalRoot)
  if (
    await pathExists(candidate.src) &&
    await pathExists(candidate.data) &&
    await pathExists(candidate.public)
  ) {
    return candidate
  }

  return null
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return walk(fullPath)
      }

      if (entry.isFile()) {
        return [fullPath]
      }

      return []
    }),
  )

  return files.flat().sort()
}

async function sha256(filePath) {
  const content = await fs.readFile(filePath)
  return createHash('sha256').update(content).digest('hex')
}

async function compareDirectories(leftRoot, rightRoot) {
  const [leftFiles, rightFiles] = await Promise.all([walk(leftRoot), walk(rightRoot)])
  const leftRelative = new Set(leftFiles.map((file) => path.relative(leftRoot, file)))
  const rightRelative = new Set(rightFiles.map((file) => path.relative(rightRoot, file)))

  const missingOnRight = [...leftRelative].filter((file) => !rightRelative.has(file)).sort()
  const extraOnRight = [...rightRelative].filter((file) => !leftRelative.has(file)).sort()
  const shared = [...leftRelative].filter((file) => rightRelative.has(file)).sort()

  const different = []
  for (const relativePath of shared) {
    const [leftHash, rightHash] = await Promise.all([
      sha256(path.join(leftRoot, relativePath)),
      sha256(path.join(rightRoot, relativePath)),
    ])

    if (leftHash !== rightHash) {
      different.push(relativePath)
    }
  }

  return {
    missingOnRight,
    extraOnRight,
    different,
    leftCount: leftFiles.length,
    rightCount: rightFiles.length,
  }
}

async function extractSlugs(dirPath) {
  const files = (await walk(dirPath)).filter((file) => {
    const base = path.basename(file)
    return base.endsWith('.ts') && !base.startsWith('_') && base !== 'index.ts'
  })

  const slugs = new Set()

  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf8')
    for (const match of content.matchAll(/slug:\s*'([^']+)'/g)) {
      slugs.add(match[1])
    }
  }

  return [...slugs].sort()
}

function routeToDistFile(routePath) {
  if (routePath === '/') {
    return path.join(distRoot, 'index.html')
  }

  return path.join(distRoot, routePath.replace(/^\//, ''), 'index.html')
}

async function assertFileExists(filePath, label) {
  try {
    await fs.access(filePath)
  } catch {
    throw new Error(`${label} 파일이 없습니다: ${filePath}`)
  }
}

async function verifyBuiltRoutes() {
  const eventSlugs = await extractSlugs(eventsDir)
  const clubSlugs = await extractSlugs(clubsDir)
  const staticPaths = staticRoutes.map(([routePath]) => routePath)

  const expectedRoutes = [
    '/',
    '/community',
    ...staticPaths,
    ...eventSlugs.map((slug) => `/events/archive/${slug}`),
    ...clubSlugs.map((slug) => `/clubs/${slug}`),
  ]

  for (const routePath of expectedRoutes) {
    await assertFileExists(routeToDistFile(routePath), `정적 경로(${routePath})`)
  }

  const redirectHtml = await fs.readFile(routeToDistFile('/community'), 'utf8')
  if (!redirectHtml.includes('/community/sns')) {
    throw new Error('/community 리다이렉트 출력이 /community/sns 를 가리키지 않습니다.')
  }

  const representativeRoutes = [
    '/',
    '/about/story',
    '/events/archive',
    '/events/archive/2025-night-of-ssafynity',
    '/clubs/doljabi-climbing',
    '/join/premium',
    '/community/sns',
    '/privacy',
  ]

  for (const routePath of representativeRoutes) {
    const html = await fs.readFile(routeToDistFile(routePath), 'utf8')
    const expectedCanonical = `https://ssafynity.github.io${routePath === '/' ? '' : routePath}`

    if (html.includes('<astro-island')) {
      throw new Error(`${routePath} 페이지에 Astro island가 남아 있습니다.`)
    }

    if (html.includes('PageIsland') || html.includes('react-router-compat')) {
      throw new Error(`${routePath} 페이지 출력에 레거시 React 런타임 흔적이 남아 있습니다.`)
    }

    if (!html.includes(expectedCanonical)) {
      throw new Error(`${routePath} 페이지 canonical이 예상값과 다릅니다.`)
    }
  }

  return {
    expectedRouteCount: expectedRoutes.length,
    staticRouteCount: staticPaths.length + 2,
    eventRouteCount: eventSlugs.length,
    clubRouteCount: clubSlugs.length,
  }
}

async function main() {
  await assertFileExists(distRoot, 'dist')
  await assertFileExists(currentSrc, 'src')
  await assertFileExists(currentData, 'site data')
  await assertFileExists(currentPublic, 'public')

  const comparisonRoot = await resolveComparisonRoot()

  const routeStats = await verifyBuiltRoutes()
  const [currentSrcFiles, currentDataFiles, currentPublicFiles] = await Promise.all([
    walk(currentSrc),
    walk(currentData),
    walk(currentPublic),
  ])

  const failures = []
  let srcCompare = null
  let dataCompare = null
  let publicCompare = null

  if (comparisonRoot) {
    ;[srcCompare, dataCompare, publicCompare] = await Promise.all([
      compareDirectories(currentSrc, comparisonRoot.src),
      compareDirectories(currentData, comparisonRoot.data),
      compareDirectories(currentPublic, comparisonRoot.public),
    ])

    if (
      srcCompare.missingOnRight.length ||
      srcCompare.extraOnRight.length ||
      srcCompare.different.length
    ) {
      failures.push({
        label: 'src parity',
        details: srcCompare,
      })
    }

    if (
      dataCompare.missingOnRight.length ||
      dataCompare.extraOnRight.length ||
      dataCompare.different.length
    ) {
      failures.push({
        label: 'data parity',
        details: dataCompare,
      })
    }

    if (
      publicCompare.missingOnRight.length ||
      publicCompare.extraOnRight.filter((file) => !allowedPublicExtraOnRight.has(file)).length ||
      publicCompare.different.length
    ) {
      failures.push({
        label: 'public parity',
        details: {
          ...publicCompare,
          extraOnRight: publicCompare.extraOnRight.filter(
            (file) => !allowedPublicExtraOnRight.has(file),
          ),
        },
      })
    }
  }

  if (failures.length > 0) {
    console.error('Migration verification failed.\n')
    for (const failure of failures) {
      console.error(`[${failure.label}]`)
      console.error(JSON.stringify(failure.details, null, 2))
      console.error('')
    }
    process.exit(1)
  }

  console.log('Migration verification passed.')
  console.log(
    JSON.stringify(
      {
        comparisonRoot: comparisonRoot ? path.basename(comparisonRoot.root) : null,
        srcFileCount: currentSrcFiles.length,
        dataFileCount: currentDataFiles.length,
        publicFileCount: currentPublicFiles.length,
        expectedRouteCount: routeStats.expectedRouteCount,
        staticRouteCount: routeStats.staticRouteCount,
        eventRouteCount: routeStats.eventRouteCount,
        clubRouteCount: routeStats.clubRouteCount,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
