// Convierte el render de Cinema 4D (PNG con transparencia) en fotogramas WebP ligeros para la web.
// Uso: npm run fotogramas            (lee la carpeta del render por defecto)
//      npm run fotogramas -- /otra/carpeta/render
import sharp from 'sharp'
import { readdirSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ENTRADA = process.argv[2] ?? '/Users/camilodanies/Documents/8000_CREATIVITY/Trade Con/render'
const SALIDA = 'public/3d/balon'
const TAM = 900      // px: el tamaño del render (el hero mide hasta 544 px → 1088 en Retina)
const CALIDAD = 90

const pngs = readdirSync(ENTRADA).filter((f) => /^balon_\d+\.png$/.test(f)).sort()
if (pngs.length === 0) throw new Error(`No hay fotogramas balon_XXXX.png en ${ENTRADA}`)

rmSync(SALIDA, { recursive: true, force: true })
mkdirSync(SALIDA, { recursive: true })
let total = 0
for (const [i, f] of pngs.entries()) {
  const destino = join(SALIDA, `${String(i).padStart(3, '0')}.webp`)
  await sharp(join(ENTRADA, f)).resize(TAM, TAM).webp({ quality: CALIDAD, alphaQuality: 90, effort: 5 }).toFile(destino)
  total += statSync(destino).size
}
console.log(`${pngs.length} fotogramas → ${SALIDA} (${(total / 1024 / 1024).toFixed(1)} MB en total)`)
