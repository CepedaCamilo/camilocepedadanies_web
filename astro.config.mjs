import { defineConfig } from 'astro/config'

export default defineConfig({
  // La dirección de la web (para la imagen al compartir y los enlaces de idioma). Mientras se prueba en v5.danies.trade,
  // `npm run publicar` la cambia con SITE_URL; cuando el dominio final esté activo, basta con quitar esa variable.
  site: process.env.SITE_URL ?? 'https://camilocepedadanies.com',
  // Páginas como "product-design.html": así los enlaces de la web antigua siguen funcionando
  build: { format: 'file' },
})
