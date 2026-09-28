// El balón del hero como secuencia de fotogramas renderizados en Cinema 4D.
// Cada fotograma es un ángulo de una vuelta completa: enseñamos el que toca según el giro.
// Fotogramas: public/3d/balon/000.webp … (se generan con `npm run fotogramas`)

// inicio: el fotograma que se ve cuando el balón termina de entrar (7 = "WE ARE THE CHAMPIONS" de frente)
// entrada / salida: en qué momento de la línea de tiempo del hero el balón está entero / se va
export function iniciarSecuencia(canvas: HTMLCanvasElement, { total = 120, ruta = '/3d/balon/', inicio = 7, entrada = 1.35, salida = 2.2 } = {}) {
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

  // Primero la vista inicial, luego uno de cada 8 (para poder girar enseguida) y luego el resto
  ;(async () => {
    await cargar(inicio)
    const paso = (i: number) => (((i - inicio) % 8) + 8) % 8
    const orden = [...Array(total).keys()].sort((a, b) => paso(a) - paso(b) || a - b)
    for (let i = 0; i < orden.length; i += 6) await Promise.all(orden.slice(i, i + 6).map(cargar))
  })()

  // Estado del giro, en vueltas (1 = 360°)
  const base = inicio / total
  let giroScroll = 0, giroLibre = 0, velocidad = 0, arrastrando = false, ultimoX = 0, activo = false
  const REPOSO = 0.0004 // giro muy lento: una vuelta cada ~40 s

  window.addEventListener('pointermove', (e) => {
    if (!arrastrando) return
    velocidad = -(e.clientX - ultimoX) * 0.0009
    ultimoX = e.clientX
  })
  canvas.addEventListener('pointerdown', (e) => { arrastrando = true; ultimoX = e.clientX; canvas.setPointerCapture(e.pointerId) })
  const soltar = () => { arrastrando = false }
  canvas.addEventListener('pointerup', soltar)
  canvas.addEventListener('pointercancel', soltar)

  let dibujado = -1
  // Tamaño real del lienzo (clientWidth ignora el zoom y el giro de la animación de GSAP;
  // getBoundingClientRect los incluiría y el balón se vería pixelado)
  const ajustar = () => {
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = Math.round(canvas.clientWidth * dpr)
    canvas.height = Math.round(canvas.clientHeight * dpr)
    dibujado = -1 // al cambiar de tamaño hay que volver a dibujar
  }
  new ResizeObserver(ajustar).observe(canvas)
  ajustar()

  let visible = true
  new IntersectionObserver(([e]) => { visible = e.isIntersecting }).observe(canvas)

  let anterior = performance.now()
  const bucle = (ahora: number) => {
    requestAnimationFrame(bucle)
    const dt = Math.min(ahora - anterior, 50) / 16.7
    anterior = ahora
    if (!visible) return
    if (!arrastrando) velocidad += ((activo ? REPOSO : 0) - velocidad) * 0.03 * dt
    giroLibre += velocidad * dt
    const vuelta = (((base + giroLibre + giroScroll) % 1) + 1) % 1
    let i = Math.floor(vuelta * total) % total
    // si ese fotograma aún no ha llegado, usamos el cargado más cercano
    for (let d = 0; d < total && !fotos[i]; d++) i = (i + 1) % total
    if (i === dibujado || !fotos[i]) return
    ctx.imageSmoothingQuality = 'high'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(fotos[i]!, 0, 0, canvas.width, canvas.height)
    dibujado = i
  }
  requestAnimationFrame(bucle)

  return {
    // tiempo de la línea de tiempo del hero. Antes de "entrada" el balón gira hasta aterrizar en la
    // vista inicial; después apenas se mueve con el scroll, para que el texto se lea bien.
    setTiempo(t: number) {
      const d = t - entrada
      giroScroll = d < 0 ? d * 0.45 : d * 0.07
      activo = t > entrada - 0.2 && t < salida
    },
  }
}
