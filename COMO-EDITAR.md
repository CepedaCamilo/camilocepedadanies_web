# Cómo editar mi web (camilocepedadanies.com)

## Ver la web en mi Mac mientras la edito
```bash
npm run dev
```
Abre http://localhost:4321 — cada vez que guardas un archivo, la página se actualiza sola.

## Añadir un proyecto o una app nueva
1. Crea un archivo en `src/content/proyectos/`, por ejemplo `app-restaurantes.md`.
   El nombre del archivo será su dirección: `camilocepedadanies.com/app-restaurantes.html`.
2. Copia esta cabecera y rellénala:
   ```yaml
   ---
   titulo: Restaurant Finder
   tipo: software            # "design" o "software" (decide en qué sección sale)
   categoria: React · MongoDB · Maps
   año: 2026
   resumen: Una o dos frases para la tarjeta y la cabecera.
   disciplinas: [React, Node, MongoDB, OpenStreetMap]
   enlace: https://restaurantes.danies.trade   # opcional
   textoEnlace: Open the app                    # opcional
   orden: 150                                   # menor = sale antes
   ---
   ```
3. Debajo de la cabecera escribe el texto del proyecto. Para imágenes:
   crea una carpeta con el mismo nombre (`src/content/proyectos/app-restaurantes/`),
   mete las imágenes y escríbelas así:
   ```md
   ![Descripción de la imagen](./app-restaurantes/pantalla.jpg)
   *Pie de foto opcional.*
   ```
4. ¿Portada? Añade `portada: ./app-restaurantes/portada.jpg` a la cabecera.
   Sin portada, la web dibuja una portada tipográfica automática.

Si te olvidas de un campo obligatorio, `npm run build` te lo dice y no publica nada roto.

## Ocultar un proyecto sin borrarlo
Añade `oculto: true` a su cabecera.

## Cambiar mi email, ciudad o descripción
Todo está en `src/sitio.ts`.

## Cambiar colores, tipografía o espacios
Todo está en `src/styles/tokens.css` (el design system). Cambia un valor y cambia en toda la web.

## Dónde está cada cosa
| Carpeta / archivo | Qué es |
|---|---|
| `src/content/proyectos/` | Los proyectos (un `.md` + una carpeta de imágenes cada uno) |
| `src/pages/index.astro` | La portada (hero, secciones, preguntas de "Core expertise") |
| `src/pages/[proyecto].astro` | El molde de la página de cada proyecto |
| `src/components/` | Piezas: cabecera, pie, tarjeta, interruptor Light/Dark |
| `src/styles/tokens.css` | Design system: colores, tipografía, espacios, radios |
| `src/styles/global.css` | Estilos base y componentes (píldoras, chips, rejilla…) |
| `src/assets/marca/` | Retrato, logos de clientes, ilustración |
| `public/` | Archivos que se sirven tal cual (favicon, vídeos) |
