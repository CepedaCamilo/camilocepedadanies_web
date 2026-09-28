// El balón 3D del hero (three.js).
// La textura la genera scripts/generar-balon.mjs a partir del diseño UCL_2025008.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export function iniciarBalon(canvas: HTMLCanvasElement) {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return null // sin WebGL: el hero sigue funcionando sin balón
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const escena = new THREE.Scene()
  const camara = new THREE.PerspectiveCamera(28, 1, 0.1, 50)
  camara.position.set(0, 0, 4.6)

  // Luz de estudio: un "cuarto" virtual que da reflejos realistas + una luz principal
  const pmrem = new THREE.PMREMGenerator(renderer)
  escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  const luz = new THREE.DirectionalLight(0xffffff, 1.6)
  luz.position.set(-2.5, 3, 4)
  escena.add(luz)

  // El balón
  const cargador = new THREE.TextureLoader()
  const color = cargador.load('/3d/balon-color.jpg')
  color.colorSpace = THREE.SRGBColorSpace
  color.anisotropy = renderer.capabilities.getMaxAnisotropy()
  const costuras = cargador.load('/3d/balon-costuras.jpg')

  const material = new THREE.MeshPhysicalMaterial({
    map: color,
    bumpMap: costuras,
    bumpScale: 2.5,        // profundidad de las costuras
    roughness: 0.42,
    clearcoat: 0.8,        // capa brillante del PU
    clearcoatRoughness: 0.22,
  })
  const balon = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 96), material)
  const grupo = new THREE.Group() // el grupo se inclina con el ratón; el balón gira dentro
  grupo.add(balon)
  grupo.rotation.x = 0.35
  escena.add(grupo)

  // Estado del movimiento
  let giroScroll = 0            // lo pone el hero según el scroll
  let giroLibre = 0             // giro continuo + arrastre
  let velocidad = 0.0035        // vueltas "de reposo"
  let inclinacion = { x: 0, y: 0 }, objetivo = { x: 0, y: 0 }
  let arrastrando = false, ultimoX = 0

  window.addEventListener('pointermove', (e) => {
    objetivo.x = (e.clientY / window.innerHeight - 0.5) * 0.5
    objetivo.y = (e.clientX / window.innerWidth - 0.5) * 0.6
    if (arrastrando) {
      velocidad = (e.clientX - ultimoX) * 0.004
      ultimoX = e.clientX
    }
  })
  canvas.addEventListener('pointerdown', (e) => { arrastrando = true; ultimoX = e.clientX; canvas.setPointerCapture(e.pointerId) })
  const soltar = () => { arrastrando = false }
  canvas.addEventListener('pointerup', soltar)
  canvas.addEventListener('pointercancel', soltar)

  // Tamaño: el canvas llena su capa
  const ajustar = () => {
    const { width, height } = canvas.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camara.aspect = width / height
    camara.updateProjectionMatrix()
  }
  new ResizeObserver(ajustar).observe(canvas)
  ajustar()

  // Solo dibujamos cuando el balón está en pantalla (ahorra batería)
  let visible = true
  new IntersectionObserver(([e]) => { visible = e.isIntersecting }).observe(canvas)

  const reloj = new THREE.Clock()
  renderer.setAnimationLoop(() => {
    if (!visible) return
    const dt = Math.min(reloj.getDelta(), 0.05) * 60
    if (!arrastrando) velocidad += (0.0035 - velocidad) * 0.02 // vuelve poco a poco al giro de reposo
    giroLibre += velocidad * dt
    inclinacion.x += (objetivo.x - inclinacion.x) * 0.05 * dt
    inclinacion.y += (objetivo.y - inclinacion.y) * 0.05 * dt
    balon.rotation.y = giroLibre + giroScroll
    grupo.rotation.x = 0.35 + inclinacion.x
    grupo.rotation.z = -inclinacion.y * 0.3
    renderer.render(escena, camara)
  })

  return {
    // progreso del scroll (0 → 1): el balón da vueltas extra al bajar
    setScroll(progreso: number) { giroScroll = progreso * Math.PI * 4 },
  }
}
