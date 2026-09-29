// Capturas REALES de la app de Yaku para el portfolio: Chrome abre yaku.danies.trade a tamaño
// de móvil y recorre el flujo de un cliente (carta → plato → pedido → estado).
// Uso: npm run capturas-yaku   (hace un pedido en la mesa demo y lo borra al terminar)
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
import { execSync } from 'node:child_process'

const WEB = 'https://yaku.danies.trade'
const SALIDA = 'src/assets/yaku'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const esperar = (ms) => new Promise((r) => setTimeout(r, ms))
const sql = (q) => execSync(`ssh -o BatchMode=yes danies "docker exec supabase-db psql -U postgres -tAc \\"${q}\\""`).toString().trim()

mkdirSync(SALIDA, { recursive: true })
const navegador = await puppeteer.launch({ executablePath: CHROME, headless: true })
const pagina = await navegador.newPage()
await pagina.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })

async function foto(nombre, opciones = {}) {
  await esperar(700)
  await pagina.screenshot({ path: `${SALIDA}/${nombre}.png`, ...opciones })
  console.log('📸', nombre)
}
const pulsar = async (selector) => { await pagina.waitForSelector(selector); await pagina.click(selector) }
const pulsarTexto = async (texto) => {
  const boton = await pagina.waitForSelector(`::-p-xpath(//button[starts-with(normalize-space(.), "${texto}")])`)
  await boton.click()
}

for (const tema of ['oscuro', 'claro']) {
  // Empezar limpio: modo, idioma inglés y sin pedido guardado
  await pagina.goto(`${WEB}/?mesa=demo`, { waitUntil: 'networkidle0' })
  await pagina.evaluate((tema) => {
    localStorage.clear()
    localStorage.setItem('yaku-tema', JSON.stringify(tema))
    localStorage.setItem('yaku-idioma', JSON.stringify('en'))
  }, tema)
  await pagina.reload({ waitUntil: 'networkidle0' })

  await foto(`${tema}-carta`)
  await foto(`${tema}-carta-larga`, { fullPage: true })

  await pulsar('button[aria-label="Mar Nikkei"]')
  await foto(`${tema}-plato`)

  await pulsarTexto('Add ·')
  await pagina.waitForSelector('.barra-pedido')
  await foto(`${tema}-carta-pedido`)

  await pulsar('.barra-pedido')
  await foto(`${tema}-pedido`)

  await pulsarTexto('Place order')
  await pagina.waitForSelector('.anillo')
  await foto(`${tema}-estado-recibido`)

  // Hacemos de cocina: el pedido pasa a "preparando" y la app se actualiza sola
  sql("update yaku_pedidos set estado='preparando' where mesa=99 and creado_en > now() - interval '2 minutes'")
  await esperar(5000)
  await foto(`${tema}-estado-preparando`)
}

// Limpiar: borrar los pedidos de prueba de estas capturas
console.log(sql("delete from yaku_pedidos where mesa=99 and creado_en > now() - interval '10 minutes' returning 'pedido de prueba borrado'"))
await navegador.close()
