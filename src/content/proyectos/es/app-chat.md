---
titulo: Chat en tiempo real — Una conversación, construida en tiempo real.
tipo: software
categoria: Diseño de producto · Full-stack
año: 2026
resumen: Una capa de mensajería reutilizable para productos digitales en los que usuarios identificados necesitan comunicarse al instante.
disciplinas: [Diseño de interacción, React, Supabase Realtime, Presencia, Postgres RLS, Autoalojado]
enlace: /chat-live.html
textoEnlace: Probar la demo en vivo
orden: 20
---

Diseñé y desarrollé el sistema completo — interfaz, mensajería en tiempo real, presencia, autenticación, control de acceso y despliegue.

![Conversación del chat en modo claro](../app-chat/claro-conversacion.png) ![Conversación del chat en modo oscuro](../app-chat/oscuro-conversacion.png)
*La misma conversación en modo claro y oscuro: tus mensajes a la derecha, los de los demás a la izquierda.*

## Pensado para vivir dentro de otros productos

El chat está pensado como un componente de comunicación flexible, no como una red social independiente.

Puede dar soporte a conversaciones entre compradores y vendedores, clientes y proveedores, miembros de una comunidad, colaboradores o cualquier otro participante dentro de un producto digital.

El contexto cambia. Las necesidades básicas siguen siendo las mismas: identidad, presencia, entrega instantánea y acceso controlado.

## Qué construí

### Mensajería en tiempo real
Los mensajes aparecen al instante, sin recargar.

### Presencia
Los participantes ven quién está conectado en ese momento.

### Acceso sin contraseña
Se entra con un código de un solo uso enviado por email.

### Seguridad en la base de datos
La autoría, las fechas y las reglas de acceso se aplican con Postgres RLS.

### Borrado automático
Los mensajes pueden caducar solos según lo que necesite cada producto.

![Indicador de "escribiendo" tras enviar un mensaje](../app-chat/claro-escribiendo.png) ![Mensaje de bienvenida en modo oscuro](../app-chat/oscuro-bienvenida.png)
*Pequeñas señales hacen que una conversación se sienta viva: un indicador de que alguien escribe, la confirmación de entrega y un primer mensaje que invita a escribir.*

## Pruébalo

La demo pública funciona entera en el navegador, así que no se guarda nada.

La implementación completa añade usuarios identificados, comunicación en tiempo real persistente, reglas de acceso en la base de datos y borrado automático de mensajes.

## Stack

### Front-end
React · Vite

### Back-end
Supabase · Postgres · Realtime

### Infraestructura
Hetzner · Caddy · Autoalojado
