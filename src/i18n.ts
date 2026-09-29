// Los tres idiomas de la web: inglés (sin prefijo: /), alemán (/de) y español (/es).
// Cada componente mira la dirección de la página (Astro.url) para saber en qué idioma está,
// y elige sus textos con t(idioma, { en: '…', de: '…', es: '…' }).
// Lo que NO se traduce: las animaciones y las demos en vivo (siguen en inglés).

export const idiomas = ['en', 'de', 'es'] as const
export type Idioma = (typeof idiomas)[number]

export const etiquetas: Record<Idioma, string> = { en: 'EN', de: 'DE', es: 'ES' }
export const nombresLargos: Record<Idioma, string> = { en: 'English', de: 'Deutsch', es: 'Español' }
export const locales: Record<Idioma, string> = { en: 'en_US', de: 'de_DE', es: 'es_ES' }

// ¿En qué idioma está esta dirección? (/de/…, /es/… o, si no, inglés)
export function idiomaDe(url: URL): Idioma {
  const primero = url.pathname.split('/')[1]?.replace(/\.html$/, '')
  return primero === 'de' || primero === 'es' ? primero : 'en'
}

// La misma página sin el idioma delante: /de/app-yaku.html → /app-yaku.html ; /de → /
// Al compilar, la portada inglesa se llama /index.html y la de error /404.html: las dos cuentan como la portada (/),
// si no el selector fabricaría /de/index.html o /de/404.html, que no existen.
export function sinIdioma(url: URL): string {
  const camino = url.pathname.replace(/^\/(de|es)(\.html|\/|$)/, '/')
  return camino === '' || /^\/(index|404)\.html$/.test(camino) ? '/' : camino
}

// Dirección de una página en un idioma: enlace('de', '/app-yaku.html') → /de/app-yaku.html ;
// enlace('de', '/#software') → /de#software ; en inglés, sin prefijo.
export function enlace(idioma: Idioma, camino = '/'): string {
  if (idioma === 'en') return camino
  if (camino === '/' || camino.startsWith('/#')) return `/${idioma}${camino.slice(1)}`
  return `/${idioma}${camino}`
}

// Elegir el texto del idioma de la página
export function t<T>(idioma: Idioma, textos: Record<Idioma, T>): T {
  return textos[idioma]
}
