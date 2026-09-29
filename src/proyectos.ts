// Los casos de estudio de cada idioma, en orden (campo "orden" del .md).
// Inglés: src/content/proyectos/*.md · Alemán: …/de/*.md · Español: …/es/*.md (mismo nombre de archivo).
import { getCollection } from 'astro:content'
import type { Idioma } from './i18n'

// 'de/app-yaku' → 'app-yaku'
export const sinIdiomaId = (id: string) => id.replace(/^(de|es)\//, '')

export async function rutasProyectos(idioma: Idioma) {
  const todos = await getCollection('proyectos', (p) => !p.data.oculto)
  const lista = todos
    .filter((p) => (idioma === 'en' ? !p.id.includes('/') : p.id.startsWith(`${idioma}/`)))
    .sort((a, b) => a.data.orden - b.data.orden)
  return lista.map((proyecto, i) => ({
    params: { proyecto: sinIdiomaId(proyecto.id) },
    // el último caso no tiene "siguiente": vuelve a la portada (What I bring)
    props: { proyecto, siguiente: i < lista.length - 1 ? lista[i + 1] : null },
  }))
}
