---
titulo: Passwordless Login
tipo: software
categoria: React · Supabase Auth
año: 2026
resumen: Sign in with a six-digit code sent by email — no passwords. It is also the account page where people can delete their account and all their data themselves.
disciplinas: [React, Vite, Supabase Auth, Edge Functions, SMTP]
enlace: https://login.danies.trade
textoEnlace: Open the login
oculto: true # ahora forma parte del caso "Private Files" (app-archivos)
orden: 120
---

## What it does

- Sends a one-time code by email through my own mail setup.
- After signing in, people can delete their account: the server empties their files, messages and profile in one step.

## What I learned

How authentication works behind the scenes, how to send email from my own domain, and how to design a destructive action so that nobody triggers it by accident.
