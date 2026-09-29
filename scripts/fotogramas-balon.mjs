// Convierte el render de Cinema 4D (PNG con transparencia) en fotogramas ligeros para la web.
// Uso: npm run fotogramas            (lee la carpeta del render por defecto)
//      npm run fotogramas -- /otra/carpeta/render
// Salen tres juegos (la web elige uno según el tamaño del balón en la pantalla):
//   public/3d/balon/900/  AVIF 900 px  → escritorio (el hero mide hasta 544 px → ~1088 en Retina)
//   public/3d/balon/720/  AVIF 720 px  → móvil (el balón mide ~360 px → 720 en Retina)
//   public/3d/balon/webp/ WebP 720 px, solo 1 de cada 4 → plan B para navegadores sin AVIF
import sharp from 'sharp'
import { readdirSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ENTRADA = process.argv[2] ?? '/Users/camilodanies/Documents/8000_CREATIVITY/Trade Con/render'
const SALIDA = 'public/3d/balon'
const JUEGOS = [
  { carpeta: '900', tam: 900, cada: 1, formato: (s) => s.avif({ quality: 60, effort: 6 }), ext: 'avif' },
  { carpeta: '720', tam: 720, cada: 1, formato: (s) => s.avif({ quality: 60, effort: 6 }), ext: 'avif' },
  { carpeta: 'webp', tam: 720, cada: 4, formato: (s) => s.webp({ quality: 82, alphaQuality: 85, effort: 6 }), ext: 'webp' },
]

const pngs = readdirSync(ENTRADA).filter((f) => /^balon_\d+\.png$/.test(f)).sort()
if (pngs.length === 0) throw new Error(`No hay fotogramas balon_XXXX.png en ${ENTRADA}`)

rmSync(SALIDA, { recursive: true, force: true })
for (const j of JUEGOS) {
  mkdirSync(join(SALIDA, j.carpeta), { recursive: true })
  let total = 0, n = 0
  for (const [i, f] of pngs.entries()) {
    if (i % j.cada !== 0) continue
    const destino = join(SALIDA, j.carpeta, `${String(i).padStart(3, '0')}.${j.ext}`)
    await j.formato(sharp(join(ENTRADA, f)).resize(j.tam, j.tam)).toFile(destino)
    total += statSync(destino).size; n++
  }
  console.log(`${n} fotogramas → ${SALIDA}/${j.carpeta} (${(total / 1024 / 1024).toFixed(1)} MB)`)
}
