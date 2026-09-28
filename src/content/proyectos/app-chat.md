---
titulo: Realtime Chat
tipo: software
categoria: React · Supabase Realtime
año: 2026
resumen: A live chat with online presence. Messages arrive instantly, sign-in works with a one-time email code, and messages delete themselves after seven days.
disciplinas: [React, Vite, Supabase Realtime, Presence, Row Level Security, pg_cron]
enlace: https://chat.danies.trade
textoEnlace: Open the chat
orden: 110
---

## What it does

- Messages appear for everyone at the same moment, without reloading.
- An "online" list shows who is in the chat right now.
- The database signs every message with its author and time, so nobody can pretend to be someone else.
- Messages older than seven days are deleted automatically every night.

## What I learned

Realtime subscriptions, presence, database triggers, security rules that live inside the database, and scheduled jobs. Also a real debugging story: a friend could read the chat but not write — his account had been deleted while his browser still held the old session.
