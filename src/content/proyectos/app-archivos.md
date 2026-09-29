---
titulo: Private Workspace — Secure by default.
tipo: software
categoria: Product design · Full-stack · Security
año: 2026
resumen: A private workspace for applications that need verified access, protected data and secure file handling.
disciplinas: [Security by Design, Verified Access, Postgres RLS, Private Storage, Signed URLs, Roles & Permissions, DSGVO]
enlace: /files-live.html
textoEnlace: Try the live demo
orden: 30
---

I designed and built the full system — authentication, permissions, private storage and deployment.

![Secure sign-in with a work email](./app-archivos/claro-acceso.png) ![Entering the one-time code](./app-archivos/oscuro-codigo.png)
*Access starts with a verified email: a one-time code, valid for a few minutes and only once.*

## Security by design

Access is verified through one-time email codes.\
Data is protected at database level with Row Level Security.\
Files remain private and can be shared through expiring signed links.

## What I built

### Verified access
Passwordless sign-in.

### Private data
User records isolated through database rules.

### Protected files
Private uploads with expiring share links.

### Roles & permissions
Access enforced server-side.

![Private files in light mode](./app-archivos/claro-espacio.png) ![Private files and an expiring link in dark mode](./app-archivos/oscuro-espacio.png)
*Every file is private by default. Sharing creates a secure link that expires on its own.*

## Built as a foundation

Designed as a reusable base for client portals, internal tools and products that handle private user data or documents.

## Stack

### Front-end
React · Vite

### Back-end
Supabase · Postgres · Auth · Storage

### Infrastructure
Hetzner Germany · Caddy
