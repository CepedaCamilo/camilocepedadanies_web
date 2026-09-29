import { defineConfig } from 'astro/config'
import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Astro copia a dist/_astro las imágenes originales (PNG/JPG de varios MB) aunque las páginas solo usen
// las versiones optimizadas (WebP). Este "barrendero" borra, al terminar la compilación, las imágenes
// que ninguna página, CSS o JS menciona. Los visitantes no las descargaban: solo ocupaban sitio en dist y en el servidor.
const barrendero = {
  name: 'barrendero-imagenes',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const raiz = fileURLToPath(dir)
      const textos = []
      const recorrer = (d) => {
        for (const f of readdirSync(d)) {
          const r = join(d, f)
          if (statSync(r).isDirectory()) recorrer(r)
          else if (/\.(html|css|js|mjs|json|xml|txt|webmanifest|svg)$/.test(f)) textos.push(readFileSync(r, 'utf8'))
        }
      }
      recorrer(raiz)
      const todo = textos.join('\n')
      let borradas = 0, bytes = 0
      for (const f of readdirSync(join(raiz, '_astro'))) {
        if (!/\.(png|jpe?g|webp|avif|gif)$/i.test(f) || todo.includes(f)) continue
        bytes += statSync(join(raiz, '_astro', f)).size
        rmSync(join(raiz, '_astro', f)); borradas++
      }
      logger.info(`${borradas} imágenes sin usar borradas de _astro (${(bytes / 1048576).toFixed(1)} MB)`)
    },
  },
}

export default defineConfig({
  // La dirección de la web (para la imagen al compartir y los enlaces de idioma). Mientras se prueba en v5.danies.trade,
  // `npm run publicar` la cambia con SITE_URL; cuando el dominio final esté activo, basta con quitar esa variable.
  site: process.env.SITE_URL ?? 'https://camilocepedadanies.com',
  // Páginas como "product-design.html": así los enlaces de la web antigua siguen funcionando
  build: { format: 'file' },
  integrations: [barrendero],
})
