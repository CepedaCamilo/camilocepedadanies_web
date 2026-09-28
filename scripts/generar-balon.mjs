// Genera la textura del balón UCL_2025008 (diseño de Camilo, Trade Con 2025) para el hero 3D.
// Uso: node scripts/generar-balon.mjs
// Salida: public/3d/balon-color.jpg (color) y balon-costuras.jpg (relieve de las costuras). Usa: npm run balon
//
// Cómo funciona: la textura es un "mapamundi" (proyección equirectangular) que three.js envuelve
// alrededor de una esfera. Para cada píxel calculamos a qué punto de la esfera corresponde,
// en qué panel cae (12 pentágonos + 20 hexágonos, como un balón clásico) y qué color lleva.
import { PNG } from 'pngjs'
import { writeFileSync } from 'node:fs'

// ---------- Parámetros de diseño (cámbialos y vuelve a ejecutar) ----------
const ANCHO = 4096
const ALTO = 2048
const COLORES = {
  blanco: [255, 255, 255],
  marino: hex('#002F6C'),   // PANTONE 648 C
  real: hex('#0047BB'),     // PANTONE 2728 C
  claro: hex('#0072CE'),    // PANTONE 285 C
  franja: hex('#003A94'),   // franjas diagonales (entre 2728 y 648)
  costura: hex('#001733'),
}
const ESTRELLA_PUNTA = 0.40    // radio de las puntas (se mete un poco en los hexágonos vecinos)
const ESTRELLA_VALLE = 0.42    // lo "gorda" que es la estrella (0.3 fina – 0.6 gorda)
const CONTORNOS = [            // anillos alrededor de la estrella, de dentro a fuera
  { hasta: 0.022, color: 'marino' },
  { hasta: 0.034, color: 'blanco' },
  { hasta: 0.056, color: 'claro' },
]
const ANCHO_COSTURA = 0.004
const PENTAGONOS_OSCUROS = [3, 8]   // paneles marino sin estrella (en el original llevan emblemas)
const PAREJAS_UNIDAS = 2            // paneles dobles "WE ARE THE CHAMPIONS" (30 paneles en total)

// ---------- Geometría del balón ----------
const φ = (1 + Math.sqrt(5)) / 2
const norm = (v) => { const l = Math.hypot(...v); return v.map((c) => c / l) }
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const sub = (a, b) => a.map((c, i) => c - b[i])
const mul = (a, s) => a.map((c) => c * s)

// Centros de los 12 pentágonos = vértices de un icosaedro
const pentagonos = []
for (const s1 of [-1, 1]) for (const s2 of [-1, 1]) {
  pentagonos.push(norm([0, s1, s2 * φ]), norm([s1, s2 * φ, 0]), norm([s2 * φ, 0, s1]))
}
// Centros de los 20 hexágonos = vértices de un dodecaedro
const hexagonos = []
for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) hexagonos.push(norm([a, b, c]))
for (const a of [-1, 1]) for (const b of [-1, 1]) {
  hexagonos.push(norm([0, a / φ, b * φ]), norm([a / φ, b * φ, 0]), norm([b * φ, 0, a / φ]))
}
// Distancia de cada cara al centro (icosaedro truncado de arista 1)
const R_PENT = 2.32744
const R_HEX = 2.2673
const caras = [
  ...pentagonos.map((n, i) => ({ n, r: R_PENT, tipo: 'pent', i })),
  ...hexagonos.map((n, i) => ({ n, r: R_HEX, tipo: 'hex', i })),
]

// Una base local (u, v) para cada centro: u apunta hacia el vecino más cercano
function base(centro, candidatos) {
  let mejor = null
  for (const c of candidatos) {
    if (c === centro) continue
    if (!mejor || dot(c, centro) > dot(mejor, centro)) mejor = c
  }
  const u = norm(sub(mejor, mul(centro, dot(mejor, centro))))
  return { u, v: cross(centro, u) }
}
const basesPent = pentagonos.map((p) => base(p, hexagonos))
const basesHex = hexagonos.map((h) => base(h, hexagonos))

// Parejas de hexágonos que forman un panel doble (opuestas entre sí)
const unidas = new Map()
{
  const h0 = 0
  let vecino = -1
  for (let j = 1; j < hexagonos.length; j++) {
    if (vecino < 0 || dot(hexagonos[j], hexagonos[h0]) > dot(hexagonos[vecino], hexagonos[h0])) vecino = j
  }
  const opuesto = (i) => hexagonos.findIndex((h) => dot(h, hexagonos[i]) < -0.999)
  const parejas = [[h0, vecino], [opuesto(h0), opuesto(vecino)]].slice(0, PAREJAS_UNIDAS)
  for (const [a, b] of parejas) { unidas.set(a, b); unidas.set(b, a) }
}

// ---------- Dibujo ----------
// Estrella de 5 puntas (función de distancia de Inigo Quilez): <0 dentro, >0 fuera
function estrella5(x, y, r, rf) {
  const k1x = 0.809016994375, k1y = -0.587785252292
  x = Math.abs(x)
  let d = Math.max(k1x * x + k1y * y, 0); x -= 2 * d * k1x; y -= 2 * d * k1y
  d = Math.max(-k1x * x + k1y * y, 0); x -= 2 * d * -k1x; y -= 2 * d * k1y
  x = Math.abs(x); y -= r
  const bax = rf * -k1y - 0, bay = rf * k1x - 1
  const h = Math.min(Math.max((x * bax + y * bay) / (bax * bax + bay * bay), 0), r)
  const dx = x - bax * h, dy = y - bay * h
  return Math.hypot(dx, dy) * Math.sign(y * bax - x * bay)
}
const mezcla = (a, b, t) => a.map((c, i) => c + (b[i] - c) * t)
const suave = (e0, e1, x) => { const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1); return t * t * (3 - 2 * t) }
const AA = 1.5 * (2 * Math.PI) / ANCHO // ancho del antialiasing (≈ 1,5 píxeles)

function colorEn(n) {
  // ¿En qué cara cae este punto? (la primera que atraviesa un rayo desde el centro)
  let c1 = null, s1 = -1, c2 = null, s2 = -1
  for (const c of caras) {
    const s = dot(n, c.n) / c.r
    if (s > s1) { c2 = c1; s2 = s1; c1 = c; s1 = s } else if (s > s2) { c2 = c; s2 = s }
  }

  // Fondo del hexágono (o del pentágono oscuro): degradado + franjas diagonales
  let color
  const centro = c1.tipo === 'hex' && unidas.has(c1.i)
    ? norm([...hexagonos[c1.i]].map((x, k) => x + hexagonos[unidas.get(c1.i)][k]))
    : c1.n
  const b = c1.tipo === 'hex' ? basesHex[c1.i] : basesPent[c1.i]
  const pr = 1 / dot(n, centro)
  const lx = dot(n, b.u) * pr, ly = dot(n, b.v) * pr
  const gradiente = suave(-0.35, 0.35, lx * 0.6 + ly)
  color = mezcla(COLORES.real, COLORES.marino, gradiente * 0.85)
  if (!(c1.tipo === 'hex' && unidas.has(c1.i))) {
    const f = ((lx * 0.8 + ly) * 26) % 1
    const franja = suave(0.42 - 0.08, 0.42, Math.abs(f < 0 ? f + 1 : f) ) * (1 - suave(0.72, 0.72 + 0.08, Math.abs(f < 0 ? f + 1 : f)))
    color = mezcla(color, COLORES.franja, franja * 0.75)
  }
  if (c1.tipo === 'pent' && PENTAGONOS_OSCUROS.includes(c1.i)) color = COLORES.marino

  // Estrella del pentágono más cercano (sus puntas se meten en los hexágonos)
  let pi = 0
  for (let i = 1; i < 12; i++) if (dot(n, pentagonos[i]) > dot(n, pentagonos[pi])) pi = i
  const panelDoble = c1.tipo === 'hex' && unidas.has(c1.i)
  if (!PENTAGONOS_OSCUROS.includes(pi)) {
    const p = pentagonos[pi], bp = basesPent[pi]
    const k = 1 / dot(n, p)
    const x = dot(n, bp.v) * k, y = dot(n, bp.u) * k // la punta mira hacia el hexágono vecino
    const d = estrella5(x, y, ESTRELLA_PUNTA, ESTRELLA_VALLE)
    if (!panelDoble || d < 0.02) {
      // de fuera hacia dentro: último contorno → … → estrella blanca
      for (let j = CONTORNOS.length - 1; j >= 0; j--) {
        color = mezcla(color, COLORES[CONTORNOS[j].color], 1 - suave(CONTORNOS[j].hasta - AA, CONTORNOS[j].hasta, d))
      }
      color = mezcla(color, COLORES.blanco, 1 - suave(-AA, 0, d))
    }
  }

  // Costuras entre paneles (no entre los dos hexágonos de un panel doble)
  const mismaPieza = c1.tipo === 'hex' && c2.tipo === 'hex' && unidas.get(c1.i) === c2.i
  const distCostura = (s1 - s2) * 2.3
  const costura = mismaPieza ? 0 : 1 - suave(ANCHO_COSTURA, ANCHO_COSTURA + AA, distCostura)
  color = mezcla(color, COLORES.costura, costura * 0.22)
  return { color, costura }
}

// ---------- Recorrer la imagen ----------
const imgColor = new PNG({ width: ANCHO, height: ALTO })
const imgCostura = new PNG({ width: ANCHO, height: ALTO })
for (let py = 0; py < ALTO; py++) {
  const theta = ((py + 0.5) / ALTO) * Math.PI
  for (let px = 0; px < ANCHO; px++) {
    const fi = ((px + 0.5) / ANCHO) * 2 * Math.PI
    // Misma convención que THREE.SphereGeometry
    const n = [-Math.cos(fi) * Math.sin(theta), Math.cos(theta), Math.sin(fi) * Math.sin(theta)]
    const { color, costura } = colorEn(n)
    const o = (py * ANCHO + px) * 4
    imgColor.data[o] = color[0]; imgColor.data[o + 1] = color[1]; imgColor.data[o + 2] = color[2]; imgColor.data[o + 3] = 255
    const g = Math.round(255 * (1 - costura))
    imgCostura.data[o] = g; imgCostura.data[o + 1] = g; imgCostura.data[o + 2] = g; imgCostura.data[o + 3] = 255
  }
}
writeFileSync('public/3d/balon-color.png', PNG.sync.write(imgColor))
writeFileSync('public/3d/balon-costuras.png', PNG.sync.write(imgCostura))
console.log(`Balón generado: ${ANCHO}×${ALTO}`)

function hex(h) { return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) }
