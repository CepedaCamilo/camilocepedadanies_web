import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// El "molde" de un proyecto. Cada archivo .md de src/content/proyectos/ tiene que rellenarlo.
// Si falta un campo obligatorio, `npm run build` avisa y no publica nada roto.
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }), // inglés en la raíz; alemán en de/, español en es/
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      tipo: z.enum(['design', 'software']),
      categoria: z.string(), // la etiqueta pequeña en mono, p. ej. "Brand identity systems"
      cliente: z.string().optional(),
      contexto: z.string().optional(), // en vez de cliente, cuando no lo hubo (p. ej. Trade Con era mi empresa): "Context · …"
      año: z.number().optional(),
      resumen: z.string(), // una o dos frases para la tarjeta y la cabecera
      disciplinas: z.array(z.string()).default([]),
      portada: image().optional(), // sin portada → portada tipográfica automática
      enlace: z.union([z.url(), z.string().startsWith('/')]).optional(), // la web o la app en vivo (o una página de esta web: /chat-live.html)
      textoEnlace: z.string().optional(),
      enlace2: z.union([z.url(), z.string().startsWith('/')]).optional(), // un segundo enlace, con borde (p. ej. el PDF del sistema de diseño)
      textoEnlace2: z.string().optional(),
      orden: z.number().default(100), // menor = sale antes
      oculto: z.boolean().default(false),
    }),
})

export const collections = { proyectos }
