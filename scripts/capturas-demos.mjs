// Capturas REALES de las demos del chat (/chat-live.html) y de Private Workspace (/files-live.html),
// en modo claro y oscuro, para los casos de estudio. Uso: npm run build && npx astro preview, y luego npm run capturas-demos
// En Private Workspace las pantallas se preparan en la página (sin pedir códigos): no se envía ningún email.
import puppeteer from 'puppeteer-core'
import { mkdirSync, copyFileSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const WEB = 'http://localhost:4321'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
// la foto que se "sube" en la demo de archivos (una copia con un nombre natural)
const FOTO = join(mkdtempSync(join(tmpdir(), 'capturas-')), 'harbour-scene.webp')
copyFileSync('public/bridge/040.webp', FOTO)
const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

const navegador = await puppeteer.launch({ executablePath: CHROME })
const pagina = await navegador.newPage()
await pagina.setViewport({ width: 600, height: 1000, deviceScaleFactor: 2 })

// Foto solo del "móvil", con las esquinas transparentes
async function foto(destino) {
  await pagina.evaluate(() => {
    document.documentElement.style.background = 'transparent'
    document.body.style.background = 'transparent'
  })
  const movil = await pagina.$('.telefono')
  await movil.screenshot({ path: destino, omitBackground: true })
  console.log('✓', destino)
}

for (const tema of ['light', 'dark']) {
  const t = tema === 'light' ? 'claro' : 'oscuro'
  await pagina.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: tema }])

  // ---------- Chat ----------
  mkdirSync('src/content/proyectos/app-chat', { recursive: true })
  await pagina.goto(`${WEB}/chat-live.html`, { waitUntil: 'networkidle0' })
  await esperar(2600) // llega el saludo
  await foto(`src/content/proyectos/app-chat/${t}-bienvenida.png`)
  await pagina.type('[data-campo]', 'Hi Camilo! Could this work inside our booking platform?')
  await pagina.click('[data-enviar]')
  await esperar(1500) // "Camilo está escribiendo…"
  await foto(`src/content/proyectos/app-chat/${t}-escribiendo.png`)
  await esperar(3000) // llega la respuesta
  await foto(`src/content/proyectos/app-chat/${t}-conversacion.png`)

  // ---------- Private Workspace ----------
  mkdirSync('src/content/proyectos/app-archivos', { recursive: true })
  await pagina.goto(`${WEB}/files-live.html`, { waitUntil: 'networkidle0' })
  await pagina.type('[data-email]', 'anna@studio.de')
  await foto(`src/content/proyectos/app-archivos/${t}-acceso.png`)
  // pantalla del código (sin llamar al servidor)
  await pagina.evaluate(() => {
    document.querySelector('[data-vista="login"]').hidden = true
    document.querySelector('[data-vista="codigo"]').hidden = false
    document.querySelector('[data-email-eco]').textContent = 'anna@studio.de'
  })
  await pagina.type('[data-codigo]', '4829')
  await esperar(700) // el aviso del email termina de bajar
  await foto(`src/content/proyectos/app-archivos/${t}-codigo.png`)
  // espacio privado con una foto subida y su enlace que caduca
  await pagina.evaluate(() => {
    document.querySelector('[data-vista="codigo"]').hidden = true
    document.querySelector('[data-vista="espacio"]').hidden = false
  })
  const input = await pagina.$('[data-input-archivo]')
  await input.uploadFile(FOTO)
  await esperar(1700)
  await pagina.click('.compartir')
  await esperar(1300)
  await foto(`src/content/proyectos/app-archivos/${t}-espacio.png`)
}
await navegador.close()
