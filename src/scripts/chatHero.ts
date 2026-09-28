// La conversación del chat del hero como línea de tiempo de GSAP.
// El hero la mete dentro de su propia línea de tiempo, así que avanza (y retrocede) con el scroll.
// Todo es reversible: al subir, los mensajes desaparecen y el texto se "desescribe".
import { gsap } from 'gsap'

export const RESPUESTA = 'Both. Same hands, same care.'

export function crearLineaChat(chat: HTMLElement) {
  const msgs = chat.querySelectorAll<HTMLElement>('[data-msg]')
  const escribiendo = chat.querySelector<HTMLElement>('[data-escribiendo]')!
  const tecleo = chat.querySelector<HTMLElement>('[data-tecleo]')!
  const placeholder = chat.querySelector<HTMLElement>('[data-placeholder]')!
  const cursor = chat.querySelector<HTMLElement>('[data-cursor]')!
  const enviar = chat.querySelector<HTMLElement>('[data-enviar]')!
  chat.querySelector('[data-final-texto]')!.textContent = RESPUESTA

  // El texto del campo depende de cuántas letras van escritas y de si ya se envió
  const estado = { letras: 0, enviado: 0 }
  const pintar = () => {
    tecleo.textContent = estado.enviado > 0.5 ? '' : RESPUESTA.slice(0, Math.round(estado.letras))
  }

  // Estado inicial: chat vacío
  gsap.set(msgs, { display: 'none', autoAlpha: 0, y: 14 })
  gsap.set(escribiendo, { display: 'none', autoAlpha: 0 })
  gsap.set(cursor, { autoAlpha: 0 })
  gsap.set(enviar, { '--pulsado': 0 })
  pintar()

  const tl = gsap.timeline({ defaults: { ease: 'none' } })
  const aparecer = { display: 'flex', autoAlpha: 1, y: 0, duration: 0.35, ease: 'back.out(1.6)' }
  // "guest está escribiendo…" durante un rato del scroll
  const puntos = (t: number) => {
    tl.set(escribiendo, { display: 'flex' }, t)
      .to(escribiendo, { autoAlpha: 1, duration: 0.15 }, t)
      .to(escribiendo, { autoAlpha: 0, duration: 0.1 }, t + 0.5)
      .set(escribiendo, { display: 'none' }, t + 0.6)
  }

  // 1. guest escribe… y llega su mensaje
  puntos(0)
  tl.to(msgs[0], aparecer, 0.6)
  // 2. tu respuesta
  tl.to(msgs[1], aparecer, 1.2)
  // 3. guest escribe… y responde
  puntos(1.7)
  tl.to(msgs[2], aparecer, 2.3)
  // 4. se escribe la respuesta en el campo, letra a letra
  tl.to(placeholder, { autoAlpha: 0, duration: 0.1 }, 2.8)
    .set(cursor, { autoAlpha: 1 }, 2.85)
    .to(estado, { letras: RESPUESTA.length, duration: 1.1, onUpdate: pintar }, 2.9)
  // 5. se pulsa Send: se hunde y cambia de color (--pulsado lo usa el CSS)
  tl.to(enviar, { scale: 0.9, duration: 0.1, ease: 'power2.in' }, 4.1)
    .to(enviar, { '--pulsado': 1, duration: 0.15 }, 4.15)
    .to(enviar, { scale: 1, duration: 0.2, ease: 'back.out(3)' }, 4.2)
  // 6. el campo se vacía y el mensaje sale como burbuja
  tl.to(estado, { enviado: 1, duration: 0.01, onUpdate: pintar }, 4.4)
    .set(cursor, { autoAlpha: 0 }, 4.4)
    .to(msgs[3], aparecer, 4.45)
    .to(placeholder, { autoAlpha: 1, duration: 0.15 }, 4.8)
    .to(enviar, { '--pulsado': 0, duration: 0.2 }, 4.9)

  return tl
}
