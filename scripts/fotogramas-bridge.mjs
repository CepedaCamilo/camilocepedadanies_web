// Convierte la escena 23 de THE BRIDGE en fotogramas WebP para la escena guiada por el scroll (Design · Case 03).
// Uso: npm run bridge
// 1) macOS (AVFoundation, sin instalar nada) saca los fotogramas del vídeo → scripts/fotogramas-video.swift
// 2) sharp los convierte en WebP ligeros → public/bridge/000.webp … + miniaturas para la línea de tiempo
import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const VIDEO = '/Users/camilodanies/Documents/8000_CREATIVITY/THE BRIDGE/THE BRIDGE MASTER/03_ASSETS_LIBRARY/AI VIDEO/Scene_23.mp4'
const SALIDA = 'public/bridge'
const N = 60          // fotogramas (el vídeo dura 6 s: 10 por segundo, de sobra para un travelling lento)
const ANCHO = 1120    // px (la escena mide ~560 px de ancho → nítido también en pantallas Retina)
const MINIATURAS = 8  // para la línea de tiempo

const tmp = mkdtempSync(join(tmpdir(), 'bridge-'))
execFileSync('swift', ['scripts/fotogramas-video.swift', VIDEO, tmp, String(N), String(ANCHO)], { stdio: 'inherit' })

rmSync(SALIDA, { recursive: true, force: true })
mkdirSync(SALIDA, { recursive: true })
const jpgs = readdirSync(tmp).filter((f) => f.endsWith('.jpg')).sort()
let total = 0
for (const [i, f] of jpgs.entries()) {
  const destino = join(SALIDA, `${String(i).padStart(3, '0')}.webp`)
  await sharp(join(tmp, f)).webp({ quality: 62, effort: 6 }).toFile(destino)
  total += statSync(destino).size
}
for (let i = 0; i < MINIATURAS; i++) {
  const f = jpgs[Math.round((i * (jpgs.length - 1)) / (MINIATURAS - 1))]
  const destino = join(SALIDA, `mini-${i}.webp`)
  await sharp(join(tmp, f)).resize({ width: 240 }).webp({ quality: 60 }).toFile(destino)
  total += statSync(destino).size
}
rmSync(tmp, { recursive: true, force: true })
console.log(`${jpgs.length} fotogramas + ${MINIATURAS} miniaturas → ${SALIDA} (${(total / 1024 / 1024).toFixed(1)} MB)`)
