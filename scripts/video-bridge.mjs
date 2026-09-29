// Versiones ligeras del vídeo de THE BRIDGE para la portada (Cine.astro). Sin sonido: allí se ve en silencio.
// Uso: npm run video
//   the-bridge-1080.mp4 → escritorio (1920×1080)
//   the-bridge-movil.mp4 → móvil en vertical: solo el centro (1080×1080), que es lo que se ve a pantalla completa
// El original con sonido (the-bridge.mp4) se queda para la página del caso de estudio.
import { execFileSync } from 'node:child_process'
import { readdirSync, rmSync } from 'node:fs'

const ORIGINAL = 'public/videos/the-bridge.mp4'
const versiones = [
  ['public/videos/the-bridge-1080.mp4', '1920', '2200'],
  ['public/videos/the-bridge-movil.mp4', '1080', '1300', '1080'],
]
for (const [salida, ...opciones] of versiones)
  execFileSync('swift', ['-suppress-warnings', 'scripts/video-ligero.swift', ORIGINAL, salida, ...opciones], { stdio: 'inherit' })

// macOS deja copias temporales (*.mp4.sb-…) al escribir el vídeo: fuera
for (const f of readdirSync('public/videos')) if (f.includes('.sb-')) rmSync(`public/videos/${f}`)
