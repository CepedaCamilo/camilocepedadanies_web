---
titulo: User Back Office
tipo: software
categoria: React · Edge Functions
año: 2026
resumen: An admin panel to create, rename and delete users. The dangerous work happens on the server, never in the browser.
disciplinas: [React, Vite, Supabase, Edge Functions, Roles & Permissions]
enlace: https://admin.danies.trade
textoEnlace: Open the back office
oculto: true # ahora forma parte del caso "Private Files" (app-archivos)
orden: 140
---

## What it does

- Lists all users with their name and role.
- Creates and deletes users through a server function that checks the caller is an admin.
- Asks for confirmation before deleting anyone.

## What I learned

Roles and permissions, why secret keys must stay on the server, and how a small function can act as a "manager" that only admins can call.
