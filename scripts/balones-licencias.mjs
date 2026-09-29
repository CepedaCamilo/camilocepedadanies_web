// Optimiza los balones de "Selected Balls" (PNG de 3000 px, ~7 MB) para la web.
// Recorta el borde transparente, 900 px, WebP con transparencia → public/licencias/
// El ORDEN de la lista es el orden en la web. Uso: npm run balones
import sharp from 'sharp'
import { mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs'

const ORIGEN = '/Users/camilodanies/Documents/8000_CREATIVITY/Trade Con/Projects/Selected Balls/'
const SALIDA = 'public/licencias'
export const BALONES = [
  ['8089FWC26_3D 1.png', 'FIFA World Cup 26™', 'fifa'],
  ['8080FW26_GER.png', 'FIFA World Cup 26™ · Germany', 'fifa'],
  ['8080FWC26_ES.png', 'FIFA World Cup 26™ · Spain', 'fifa'],
  ['8080FWC26_FR.png', 'FIFA World Cup 26™ · France', 'fifa'],
  ['8080FWC26_IT.png', 'FIFA World Cup 26™ · Italy', 'fifa'],
  ['8080FWC26_NL.png', 'FIFA World Cup 26™ · Netherlands', 'fifa'],
  ['8080FWC26_PT.png', 'FIFA World Cup 26™ · Portugal', 'fifa'],
  ['8080FWC26_BE.png', 'FIFA World Cup 26™ · Belgium', 'fifa'],
  ['8080FW26_CH.png', 'FIFA World Cup 26™ · Switzerland', 'fifa'],
  ['8080FWC26_AT.png', 'FIFA World Cup 26™ · Austria', 'fifa'],
  ['8080FWC26_PL.png', 'FIFA World Cup 26™ · Poland', 'fifa'],
  ['8080FWC26_SL.png', 'FIFA World Cup 26™ · Slovenia', 'fifa'],
  ['8080FWC26_AUS.png', 'FIFA World Cup 26™ · Australia', 'fifa'],
  ['DFB_255118_ALDI_281125_low-1.png', 'DFB · Die Mannschaft', 'dfb'],
  ['UCL_2024033_Balls.png', 'UEFA Champions League', 'uefa'],
  ['UCL_2025041_3D.png', 'UEFA Champions League', 'uefa'],
]

rmSync(SALIDA, { recursive: true, force: true })
mkdirSync(SALIDA, { recursive: true })
let total = 0
const lista = []
for (const [i, [archivo, nombre, grupo]] of BALONES.entries()) {
  const destino = `${String(i + 1).padStart(2, '0')}.webp`
  await sharp(ORIGEN + archivo).trim().resize(900, 900, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(`${SALIDA}/${destino}`)
  total += statSync(`${SALIDA}/${destino}`).size
  lista.push({ src: `/licencias/${destino}`, nombre, grupo })
}
// La lista la lee la web (src/components/LicenciasEscaparate.astro)
writeFileSync('src/data/balones.json', JSON.stringify(lista, null, 2))
console.log(`${lista.length} balones → ${SALIDA} (${(total / 1024 / 1024).toFixed(2)} MB en total)`)
