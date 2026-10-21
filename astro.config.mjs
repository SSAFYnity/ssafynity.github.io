import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  site: 'https://ssafynity.github.io',
  redirects: {
    '/events/archive/2026-second-half-regular-event': '/events/archive/2026-ssafynale',
  },
  vite: {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src/site', import.meta.url)),
        },
        {
          find: '~',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  },
})
