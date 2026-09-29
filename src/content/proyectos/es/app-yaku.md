---
titulo: Yaku — Pedir desde la mesa
tipo: software
categoria: Diseño de producto · Full-stack
cliente: Yaku Restaurante, Hamburgo
año: 2026
resumen: Pedidos por QR para un restaurante peruano-mexicano en Hamburgo — una app para clientes centrada en la fotografía, en alemán e inglés, y una pantalla de cocina que recibe cada pedido en tiempo real. Diseñada, desarrollada y alojada por mí.
disciplinas: [Diseño de producto, Diseño UI, React, Supabase Realtime, Postgres RLS, DSGVO]
enlace: https://yaku.danies.trade/?mesa=demo
textoEnlace: Probar la demo en vivo
orden: 10
---

## El encargo

Yaku ya tenía una marca fuerte y una gran cocina. Hace años diseñé para ellos un *Mobile Ordering Prototype*, pero solo eran visuales. Esta vez el objetivo era un **producto que funcionara**, que los dueños pudieran probar con clientes reales sin cambiar la forma de cobrar: los clientes piden desde la mesa y pagan al camarero como siempre.

## Dónde empezó todo

![El Mobile Ordering Prototype original — solo visuales](../app-yaku/prototipo-recorte.png)
*Antes de la app: el Mobile Ordering Prototype original, todavía solo visuales.*

![La web responsive de Yaku](../app-yaku/web-yaku.jpg)
*La web responsive del restaurante — parte de la experiencia de marca que diseñé para Yaku.*

[Ver la web de Yaku ↗](https://www.yaku-restaurante.de)

## Qué construí

- **App para clientes** — escanear el QR de la mesa, recorrer una carta con fotos, abrir un plato, añadir una nota para la cocina, enviar el pedido y seguir su estado en vivo. En alemán e inglés, en modo claro y oscuro.
- **Pantalla de cocina** — una vista para tablet donde los pedidos nuevos llegan con un sonido. Un toque mueve un pedido de *nuevo* a *en preparación* y a *servido*, y el móvil del cliente se actualiza solo. Los platos se pueden marcar como agotados.
- **Sistema QR** — cada mesa tiene su propio código secreto, impreso en una tarjeta. Sin él, nadie puede hacer un pedido.

![Carta en modo claro, con la textura de lienzo de Yaku](../app-yaku/claro-carta.png) ![Carta en modo oscuro](../app-yaku/oscuro-carta.png)
*La carta en los dos modos: el claro usa la textura de lienzo de la propia web de Yaku; el oscuro, un negro cálido que hace brillar la fotografía de los platos.*

![Plato en modo claro](../app-yaku/claro-plato.png) ![Plato en modo oscuro](../app-yaku/oscuro-plato.png)
*Cada plato se abre a pantalla completa: la foto es la que vende. Los clientes pueden dejar una nota para la cocina.*

![Pantalla del pedido](../app-yaku/claro-pedido.png) ![Estado del pedido en vivo](../app-yaku/oscuro-estado-preparando.png)
*Revisar el pedido, enviarlo y ver cómo avanza el estado mientras trabaja la cocina.*

## Decisiones de diseño

- **La fotografía primero.** El prototipo solo muestra platos con foto y empieza con una *Chef's pick*. Una carta es una herramienta de venta.
- **Dos ambientes, una marca.** El modo oscuro usa un negro cálido (`#121110`) en lugar de negro puro, para que case con la madera oscura de las fotos. El modo claro usa la textura de lienzo del propio restaurante. El color de acento es el *ají amarillo*, el chile peruano de sus platos.
- **Detalles de marca.** La tipografía de Yaku y su "Y" dibujada a mano como icono de la app.
- **Una pantalla de cocina para manos ocupadas.** Alto contraste, botones grandes, el número de mesa legible desde el otro lado del pase y las notas de los clientes destacadas, para que nadie pase por alto un *"sin cilantro"*.

## Arquitectura

- **Front-end:** React + Vite, una sola app para clientes (`/`) y cocina (`/cocina`).
- **Back-end:** Supabase, autoalojado en mi propio servidor de Hetzner en Núremberg — Postgres, Realtime y Auth — detrás de Caddy con HTTPS automático.
- **Tiempo real:** la cocina se suscribe a los cambios de los pedidos y los recibe al instante; el estado del cliente se actualiza cada pocos segundos.
- **Seguro por defecto:** seguridad a nivel de fila (RLS) en todas las tablas. Los clientes solo pueden crear un pedido a través de una función de la base de datos que comprueba el código secreto de la mesa y limita cuántos pedidos puede enviar una mesa en pocos minutos. La cocina tiene su propio rol: puede ver y mover pedidos, pero no es administradora. Comprobé las reglas con pruebas automáticas actuando como un visitante anónimo.

## Privacidad (DSGVO)

Los clientes no crean cuentas y no se recogen datos personales: solo una mesa y unos platos. Todo funciona en un servidor en Alemania, y los pedidos de prueba se borran solos cada noche.

## Estado

**Prototipo en vivo**, que los dueños están probando ahora mismo. Próximos pasos: información de alérgenos en todos los platos (obligatoria por ley en la UE), una carta que el restaurante pueda editar por sí mismo y la conexión con su caja.
