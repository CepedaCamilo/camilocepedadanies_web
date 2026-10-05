import { defineConfig } from 'astro/config'
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
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

// Regla de tipógrafo: una palabra corta ("de", "y", "a", "the", "and", "und"…) nunca se queda sola al final de
// una línea. Al terminar la compilación, este "pegamento" cambia el espacio que va DESPUÉS de esas palabras por
// un espacio irrompible (U+00A0) en todas las páginas: así la palabra corta salta de línea junto con la siguiente.
// Solo toca el texto visible (no etiquetas, atributos, <script>, <style>, <pre> ni <code>). Vale para EN, DE y ES.
const CORTAS = `I a an the and or of to in on at by as for with from into my our its is are
  y e o u ni de del la el lo los las en con por para sin un una unos unas al que se su sus mi mis tu
  und oder der die das den dem des ein eine einen einem einer mit von vom zu zum zur im am an auf für bei aus ich wie als &amp;`
  .split(/\s+/)
const regla = new RegExp(`(?<=^|[\\s>(“"'¿¡«])(${CORTAS.join("|")})[ \\t\\n\\r]+(?=\\S|$)`, 'giu')
// Palabras alemanas tan largas que no caben en un titular del móvil: un guion invisible (U+00AD) en su unión natural.
// Solo se ve si la palabra no cabe en la línea ("Datenschutz-/erklärung"); si cabe, no cambia nada.
const LARGAS = { Datenschutzerklärung: 'Datenschutz\u00aderklärung', Kampagnendesign: 'Kampagnen\u00addesign' }
const reglaLargas = new RegExp(Object.keys(LARGAS).join('|'), 'g')
// Titulares partidos a mano: " / " marca los ÚNICOS sitios donde se puede cortar; los demás espacios no cortan nunca.
// Para añadir uno: copia la frase tal cual sale en la web y pon " / " donde quieras permitir el salto de línea.
const FRASES = [
  'Gutes Essen / verdient einen / zweiten Tisch.',
  'Good food / deserves / another table.',
  'Lo bueno merece / otra mesa.',
]
const frases = FRASES.map((f) => [f.replaceAll(' / ', ' '), f.split(' / ').map((t) => t.replaceAll(' ', '\u00a0')).join(' ')])
const pegamento = {
  name: 'pegamento-palabras-cortas',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      let paginas = 0, pegadas = 0
      const recorrer = (d) => {
        for (const f of readdirSync(d)) {
          const r = join(d, f)
          if (statSync(r).isDirectory()) { recorrer(r); continue }
          if (!f.endsWith('.html')) continue
          // 1) apartar enteros los bloques <script>, <style>, <pre>, <code> y <textarea>; 2) en el resto, solo el texto entre etiquetas
          const html = readFileSync(r, 'utf8').split(/(<(script|style|pre|code|textarea)\b[\s\S]*?<\/\2\s*>)/i).map((bloque, i) => {
            if (i % 3 === 1) return bloque // bloque apartado, tal cual
            if (i % 3 === 2) return ''     // (nombre de la etiqueta capturado por el split)
            const trozos = bloque.split(/(<[^>]*>)/)
            const abiertas = [] // etiquetas abiertas en este punto (para saber si el texto está dentro de un titular grande)
            return trozos.map((trozo, j) => {
              if (trozo.startsWith('<')) {
                const m = /^<(\/?)([a-z0-9-]+)([^>]*)>/i.exec(trozo)
                if (m && m[1]) abiertas.pop()
                else if (m && !/\/$/.test(m[3]) && !/^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i.test(m[2]))
                  abiertas.push(m[2] + ' ' + (/class="([^"]*)"/.exec(m[3])?.[1] ?? ''))
                return trozo
              }
              trozo = trozo.replace(regla, (_, palabra) => { pegadas++; return palabra + '\u00a0' })
              if (!/^<title\b/i.test(trozos[j - 1] ?? '')) trozo = trozo.replace(reglaLargas, (p) => LARGAS[p])
              for (const [frase, partida] of frases) if (trozo.replaceAll('\u00a0', ' ').includes(frase)) trozo = trozo.replaceAll('\u00a0', ' ').replace(frase, partida)
              // la última palabra de un título, párrafo, pregunta… nunca va sola en su línea (si es corta).
              // En titulares grandes, solo si la penúltima no está ya pegada a otra: 3 palabras juntas no caben en el móvil.
              if (/^<\/(p|h[1-6]|li|dt|dd|figcaption|blockquote|button|a|span|em|strong|label)>/i.test(trozos[j + 1] ?? '')) {
                const grande = abiertas.some((a) => /^h[1-3] |titulo|titular/.test(a))
                trozo = grande
                  ? trozo.replace(/(^|[ \t\n\r])([^\s]+)[ \t\n\r]+([^\s]{1,16}[ \t\n\r]*)$/u, (_, a, b, c) => { pegadas++; return a + b + '\u00a0' + c })
                  : trozo.replace(/(\S)[ \t\n\r]+(\S{1,16}[ \t\n\r]*)$/u, (_, a, b) => { pegadas++; return a + '\u00a0' + b })
              }
              return trozo
            }).join('')
          }).join('')
          writeFileSync(r, html); paginas++
        }
      }
      recorrer(fileURLToPath(dir))
      logger.info(`${pegadas} palabras cortas pegadas a la siguiente en ${paginas} páginas`)
    },
  },
}

export default defineConfig({
  // La dirección de la web (para la imagen al compartir y los enlaces de idioma). Activa desde el 29 sep 2026.
  // Para una prueba en otra dirección: SITE_URL=https://… astro build
  site: process.env.SITE_URL ?? 'https://camilocepedadanies.com',
  // Páginas como "product-design.html": así los enlaces de la web antigua siguen funcionando
  build: { format: 'file' },
  integrations: [barrendero, pegamento],
})
