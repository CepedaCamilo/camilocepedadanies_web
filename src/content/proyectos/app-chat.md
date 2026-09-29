---
titulo: Realtime Chat — A conversation, built in real time
tipo: software
categoria: Product design · Full-stack
año: 2026
resumen: A focused web application exploring what happens behind a seemingly simple interaction — two people, one conversation, instantly synchronized. Designed as a private, self-hosted messaging layer for business software.
disciplinas: [Interaction Design, React, Supabase Realtime, Presence, Postgres RLS, pg_cron, DSGVO]
enlace: /chat-live.html
textoEnlace: Try the live demo
orden: 110
---

## The idea

Sending a message feels like nothing. Behind it, a lot has to go right: the message has to reach the other person in a fraction of a second, it has to be signed by the right author, only the right people may read it, and it should not live forever. This project is about designing that invisible part as carefully as the interface.

## Made for private use, inside companies

The chat is designed as a **closed, private tool** — not a public social network. It is meant to live inside business software:

- **Internal team channels** — a project room, a shift handover, a quick question to the office.
- **Operations screens** — for example a kitchen, a warehouse or a front desk, where people need to see new information the moment it arrives.
- **Customer or partner portals** — a private conversation between a company and the people it already works with.

Everyone in the chat has a known account. There is no advertising and no tracking. The whole system runs on **my own server in Germany**, so a company knows exactly where its conversations are stored.

## What I built

- **Instant messages** — new messages appear for everyone at the same moment, without reloading the page.
- **Presence** — an "online" list shows who is in the room right now.
- **Passwordless sign-in** — a one-time six-digit code sent by email. No passwords to forget or leak.
- **Signed messages** — the database itself stamps every message with its author and time. Nobody can post in someone else's name, even by manipulating the browser.
- **Automatic retention** — messages older than seven days are deleted every night.
- **Graceful edge cases** — if an account is removed while someone still has the chat open, the app notices, signs that person out and explains what happened, instead of silently failing.

## Interaction design

The goal was a chat that feels calm and obvious. Your messages sit on the right in the accent colour, everyone else's on the left. A typing indicator makes the other person feel present. The *Send* button reacts to the touch, and the input clears the moment the message leaves. The same visual language runs through the whole portfolio, in light and dark mode.

## Try it

The [live demo](/chat-live.html) is a public version of the interface, open to anyone without signing in. It is **private by design**: what you write stays in your own browser, nothing is sent to a server or stored, and reloading the page starts a fresh conversation. The real chat — with accounts and a database — stays closed, as it would inside a company.

## Architecture

- **Front-end:** React + Vite.
- **Back-end:** Supabase, self-hosted on a Hetzner server in Nuremberg — Postgres, Auth and Realtime — behind Caddy with automatic HTTPS.
- **Security rules in the database:** row-level security decides who can read and write. Reading requires a signed-in account; writing is only allowed as yourself; a database trigger fills in the author and time.
- **Scheduled jobs:** `pg_cron` deletes old messages every night.

## Privacy (DSGVO)

Data minimisation is built in: an email address to sign in, the messages themselves, and nothing else. Data stays in Germany, logs rotate automatically, messages expire after seven days, and users can delete their own account — which removes their messages with it. A data processing agreement with the hosting provider is in place.

## What I learned

Realtime subscriptions, presence, database triggers, security rules that live inside the database, and scheduled jobs. And a real debugging story: a friend could read the chat but not write — his account had been deleted while his browser still held the old session. That bug became the "graceful edge cases" feature above.
