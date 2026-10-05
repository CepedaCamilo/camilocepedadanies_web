---
titulo: Otra Mesa — Lo bueno merece otra mesa.
tipo: software
categoria: Diseño de producto · Marca · Full-stack
año: 2026
resumen: Una app para salvar comida en Barranquilla que funciona de verdad — reservas reales, un código QR para recoger y un back office, sobre un stack que construí y alojo yo mismo.
disciplinas: [Diseño de producto, Identidad de marca, API en Node.js, Postgres, MongoDB geo, Login sin contraseña, Back office, Monorepo]
enlace: https://otramesa.danies.trade
textoEnlace: Probar la demo en vivo
orden: 25
---

Diseñé la marca y el producto, desarrollé la API, las dos bases de datos, la app para clientes y el back office, y lo alojo todo en mi propio servidor.

![Descubrir: una sorpresa destacada y lo que hay cerca](../app-otramesa/discover.png) ![Una sorpresa, lista para reservar](../app-otramesa/surprise.png)
*Los restaurantes ofrecen la comida buena que no vendieron como "sorpresas de la casa", a un tercio del precio. Usted reserva una y la recoge hoy mismo.*

## Inspirada, no copiada

El modelo es conocido — Too Good To Go demostró que funciona. El reto fue mantener el esqueleto (mirar, mapa, reservar, recoger) y diseñar todo lo demás desde cero: nombre, logo, color, tono y la propia "sorpresa de la casa". Una demo que funciona, con restaurantes y mayoristas inventados en Barranquilla, Colombia.

## Lo que construí

### La trastienda
Una API en Node.js delante de dos cocinas: Postgres como archivo oficial y MongoDB como brújula para "cerca de mí".

### Cerca de mí, al metro
Un índice 2dsphere y `$geoNear` encuentran lo que hay a 300 m, 1 km o 10 km — comprobado con la fórmula de Haversine.

### Reservas que nunca venden de más
El stock baja en un solo paso de la base de datos: si queda una sorpresa y dos personas pulsan a la vez, solo una la consigue.

### Login sin contraseñas
Códigos por email, hechos desde cero: solo se guardan huellas, los códigos caducan y se queman tras cinco intentos.

### Un back office para el equipo
Dar de alta restaurantes tocando el mapa y entregar una sorpresa con el código de cuatro letras del cliente.

![Todos los restaurantes, con filtros: tipo, precio, vegetariano, abierto ahora](../app-otramesa/explore-restaurants.png) ![El back office: reservas y entrega por código](../app-otramesa/back-office.png)
*Explorar todos los restaurantes — o solo los abiertos ahora, en hora de Barranquilla. Cada reserva entra en el back office.*

## Hecha para dar confianza

Copias de seguridad nocturnas probadas restaurándolas, límites de peticiones, borrado automático a los 30 días, dos vigilantes y un robot que recorre todo el camino — reservar, entregar, cancelar, borrar la cuenta — después de cada cambio.

## Stack

### Front-end
React · Vite · Leaflet + OpenStreetMap

### Back-end
Node.js · Express · Postgres · MongoDB

### Infraestructura
Hetzner Alemania · Docker · Caddy · Monorepo
