// Prepara las "pantallas" del caso Transalp (Design · Case 02): npm run transalp
// Recorta el contenido de cada pantalla de las imágenes del proyecto y lo guarda optimizado en public/transalp/.
// Los dispositivos (marcos) se dibujan en HTML/CSS: aquí solo van las imágenes de dentro.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const origen = 'src/content/proyectos/integrated-campaign-communication/'
const destino = 'public/transalp/'
mkdirSync(destino, { recursive: true })

const webp = { quality: 80, effort: 6 }
const guardar = async (entrada, recorte, ancho, nombre) => {
  const info = await sharp(origen + entrada).extract(recorte).resize({ width: ancho }).webp(webp).toFile(destino + nombre)
  console.log(nombre, info.width + '×' + info.height, Math.round(info.size / 1024) + ' KB')
}

// Portátil: la página de Facebook (en rollout.jpg la pantalla está de frente y sin nada delante)
await guardar('rollout.jpg', { left: 1240, top: 569, width: 782, height: 489 }, 1200, 'laptop-facebook.webp')
// Móvil: el perfil de Instagram
await guardar('rollout.jpg', { left: 91, top: 731, width: 187, height: 392 }, 336, 'movil-instagram.webp')
// Pantalla grande: el tráiler "Take a ride on the wild side", recortado a 16:10 alrededor del titular
await guardar('trailer.jpg', { left: 645, top: 0, width: 2024, height: 1265 }, 1600, 'pantalla-trailer.webp')
// Tablet: 5 publicaciones de la campaña social (social.jpg es una rejilla de 5 × 2, cada una 400 × 532)
const publicaciones = [
  ['post-ruta.webp', 4, 0],
  ['post-bruneck.webp', 1, 0],
  ['post-regla.webp', 2, 0],
  ['post-fecha.webp', 2, 1],
  ['post-ciclista.webp', 1, 1],
]
for (const [nombre, col, fila] of publicaciones) {
  await guardar('social.jpg', { left: col * 400 + 2, top: fila * 533 + 1, width: 396, height: 530 }, 600, nombre)
}
