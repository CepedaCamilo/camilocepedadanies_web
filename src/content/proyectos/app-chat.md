---
titulo: Realtime Chat — A conversation, built in real time.
tipo: software
categoria: Product design · Full-stack
año: 2026
resumen: A reusable messaging layer for digital products where authenticated users need to communicate instantly.
disciplinas: [Interaction Design, React, Supabase Realtime, Presence, Postgres RLS, Self-hosted]
enlace: /chat-live.html
textoEnlace: Try the live demo
orden: 20
---

I designed and built the complete system — interface, real-time messaging, presence, authentication, access control and deployment.

![Chat conversation in light mode](./app-chat/claro-conversacion.png) ![Chat conversation in dark mode](./app-chat/oscuro-conversacion.png)
*The same conversation in light and dark mode — your messages on the right, everyone else's on the left.*

## Built to live inside other products

The chat is designed as a flexible communication component rather than a standalone social network.

It can support conversations between buyers and sellers, customers and providers, community members, collaborators or any other participants inside a digital product.

The context changes. The core needs remain the same: identity, presence, instant delivery and controlled access.

## What I built

### Realtime messaging
Messages appear instantly without reloading.

### Presence
Participants can see who is currently online.

### Passwordless access
Users sign in through a one-time email code.

### Database-level security
Authorship, timestamps and access rules are enforced through Postgres RLS.

### Automatic retention
Messages can expire automatically based on product requirements.

![Typing indicator after sending a message](./app-chat/claro-escribiendo.png) ![Welcome message in dark mode](./app-chat/oscuro-bienvenida.png)
*Small signals make a conversation feel alive: a typing indicator, delivery confirmation and a first message that invites people to write.*

## Try it

The public demo runs entirely in the browser, so nothing is stored.

The complete implementation adds authenticated users, persistent real-time communication, database access rules and automated message retention.

## Stack

### Front-end
React · Vite

### Back-end
Supabase · Postgres · Realtime

### Infrastructure
Hetzner · Caddy · Self-hosted
