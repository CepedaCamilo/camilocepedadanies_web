import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://camilocepedadanies.com',
  // Páginas como "product-design.html": así los enlaces de la web antigua siguen funcionando
  build: { format: 'file' },
})
