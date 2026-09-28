// El balón del hero como secuencia de fotogramas renderizados en Cinema 4D.
// Cada fotograma es un ángulo de una vuelta completa: enseñamos el que toca según el giro.
// Fotogramas: public/3d/balon/000.webp … (se generan con `npm run fotogramas`)

export function iniciarSecuencia(canvas: HTMLCanvasElement, total = 120, ruta = '/3d/balon/') {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const fotos: (HTMLImageElement | undefined)[] = new Array(total)

  const cargar = (i: number) =>
    new Promise<void>((listo) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => { fotos[i] = img; listo() }
      img.onerror = () => listo()
      img.src = `${ruta}${String(i).padStart(3, '0')}.webp`
    })

  // Primero uno de cada 8 (para poder girar enseguida) y luego el resto
  ;(async () => {
    await cargar(0)
    const orden = [...Array(total).keys()].sort((a, b) => (a % 8) - (b % 8) || a - b)
    for (let i = 0; i < orden.length; i += 6) await Promise.all(orden.slice(i, i + 6).map(cargar))
  })()

  // Estado del giro, en vueltas (1 = 360°)
  let giroScroll = 0, giroLibre = 0, velocidad = 0.0012, arrastrando = false, ultimoX = 0
  const REPOSO = 0.0012

  window.addEventListener('pointermove', (e) => {
    if (!arrastrando) return
    velocidad = -(e.clientX - ultimoX) * 0.0009
    ultimoX = e.clientX
  })
  canvas.addEventListener('pointerdown', (e) => { arrastrando = true; ultimoX = e.clientX; canvas.setPointerCapture(e.pointerId) })
  const soltar = () => { arrastrando = false }
  canvas.addEventListener('pointerup', soltar)
  canvas.addEventListener('pointercancel', soltar)

  const ajustar = () => {
    const { width, height } = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
  }
  new ResizeObserver(ajustar).observe(canvas)
  ajustar()

  let visible = true
  new IntersectionObserver(([e]) => { visible = e.isIntersecting }).observe(canvas)

  let anterior = performance.now(), dibujado = -1
  const bucle = (ahora: number) => {
    requestAnimationFrame(bucle)
    const dt = Math.min(ahora - anterior, 50) / 16.7
    anterior = ahora
    if (!visible) return
    if (!arrastrando) velocidad += (REPOSO - velocidad) * 0.03 * dt
    giroLibre += velocidad * dt
    const vuelta = (((giroLibre + giroScroll) % 1) + 1) % 1
    let i = Math.floor(vuelta * total) % total
    // si ese fotograma aún no ha llegado, usamos el cargado más cercano
    for (let d = 0; d < total && !fotos[i]; d++) i = (i + 1) % total
    if (i === dibujado || !fotos[i]) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(fotos[i]!, 0, 0, canvas.width, canvas.height)
    dibujado = i
  }
  requestAnimationFrame(bucle)

  return {
    // progreso del scroll (0 → 1): una vuelta y media extra al bajar
    setScroll(progreso: number) { giroScroll = progreso * 1.5 },
  }
}
