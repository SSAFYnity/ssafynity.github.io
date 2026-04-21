import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  site: 'https://ssafynity.github.io',
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
