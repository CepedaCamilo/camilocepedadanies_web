// La imagen que se ve al compartir la web (WhatsApp, LinkedIn, Slack…): una captura del hero tal como está.
// Uso: npm run build && npx astro preview, y luego npm run imagen-compartir → public/og.jpg (1200×630, el tamaño estándar)
// La captura se hace ya en la proporción 1200:630, así solo se recortan zonas vacías (arriba y abajo del hero).
import puppeteer from 'puppeteer-core'
import sharp from 'sharp'

const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 756, deviceScaleFactor: 2 }) // 1440 / 756 = 1200 / 630
await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1500))
const png = await p.screenshot({ type: 'png' })
await b.close()
await sharp(png).resize(1200, 630).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og.jpg')
console.log('✓ public/og.jpg (1200×630)')
