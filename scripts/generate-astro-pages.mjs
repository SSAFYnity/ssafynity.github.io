import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { staticRoutes } from './astro-route-manifest.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const pagesRoot = path.join(projectRoot, 'src', 'pages')

function routeToFile(routePath) {
  if (routePath === '/') return path.join(pagesRoot, 'index.astro')
  return path.join(pagesRoot, routePath.replace(/^\//, ''), 'index.astro')
}

function staticPageTemplate(routePath, pageKey) {
  return `---
import SiteLayout from '~/layouts/SiteLayout.astro'

const pathname = '${routePath}'
---

<SiteLayout pathname={pathname}>
  <section class="px-6 py-20">
    <!-- TODO: Implement ${pageKey} as a pure Astro page -->
  </section>
</SiteLayout>
`
}

const notFoundTemplate = `---
import SiteLayout from '~/layouts/SiteLayout.astro'
---

<SiteLayout pathname="/404" canonical="https://ssafynity.github.io/404.html">
  <div class="flex min-h-[50vh] items-center justify-center px-6 text-center">
    <p class="text-sm font-extrabold text-slate-700">페이지를 찾을 수 없습니다.</p>
  </div>
</SiteLayout>
`

const communityRedirectTemplate = `---
return Astro.redirect('/community/sns')
---
`

const eventDetailTemplate = `---
import SiteLayout from '~/layouts/SiteLayout.astro'
import { allEvents } from '@/data/computed'

export function getStaticPaths() {
  return allEvents.map((event) => ({
    params: { slug: event.slug },
  }))
}

const { slug } = Astro.params
const pathname = \`/events/archive/\${slug}\`
---

<SiteLayout pathname={pathname}>
  <section class="px-6 py-20">
    <!-- TODO: Implement events archive detail as a pure Astro page -->
  </section>
</SiteLayout>
`

const clubDetailTemplate = `---
import SiteLayout from '~/layouts/SiteLayout.astro'
import { allClubs } from '@/data/computed'

export function getStaticPaths() {
  return allClubs.map((club) => ({
    params: { slug: club.slug },
  }))
}

const { slug } = Astro.params
const pathname = \`/clubs/\${slug}\`
---

<SiteLayout pathname={pathname}>
  <section class="px-6 py-20">
    <!-- TODO: Implement club detail as a pure Astro page -->
  </section>
</SiteLayout>
`

async function writeFileIfMissing(filePath, content) {
  try {
    await fs.access(filePath)
    return
  } catch {}

  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, content)
}

async function main() {
  await Promise.all(
    staticRoutes.map(([routePath, pageKey]) =>
      writeFileIfMissing(routeToFile(routePath), staticPageTemplate(routePath, pageKey)),
    ),
  )

  await writeFileIfMissing(path.join(pagesRoot, '404.astro'), notFoundTemplate)
  await writeFileIfMissing(path.join(pagesRoot, 'community', 'index.astro'), communityRedirectTemplate)
  await writeFileIfMissing(path.join(pagesRoot, 'events', 'archive', '[slug].astro'), eventDetailTemplate)
  await writeFileIfMissing(path.join(pagesRoot, 'clubs', '[slug].astro'), clubDetailTemplate)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
