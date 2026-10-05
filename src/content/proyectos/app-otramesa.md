---
titulo: Otra Mesa — Good food deserves another table.
tipo: software
categoria: Product design · Brand · Full-stack
año: 2026
resumen: A working food-rescue app for Barranquilla — real reservations, a QR pick-up code and a back office, on a stack I built and host myself.
disciplinas: [Product Design, Brand Identity, Node.js API, Postgres, MongoDB Geo, Passwordless Login, Back Office, Monorepo]
enlace: https://otramesa.danies.trade
textoEnlace: Try the live demo
orden: 25
---

I designed the brand and the product, built the API, the two databases, the customer app and the back office, and host everything on my own server.

![Discover: a featured surprise and what's near you](./app-otramesa/discover.png) ![A surprise, ready to reserve](./app-otramesa/surprise.png)
*Restaurants offer the good food they didn't sell as "house surprises", at about a third of the price. You reserve one and pick it up today.*

## Inspired, not copied

The model is well known — Too Good To Go proved it works. The challenge was to keep the skeleton (browse, map, reserve, pick up) and design everything else from scratch: name, logo, colour, voice and the "house surprise" itself. A working demo with made-up restaurants and wholesalers in Barranquilla, Colombia.

## What I built

### The back of house
A Node.js API in front of two kitchens: Postgres as the official record, MongoDB as the compass for "near me".

### Near me, to the metre
A 2dsphere index and `$geoNear` find what's within 300 m, 1 km or 10 km — checked against the Haversine formula.

### Reservations that never oversell
Stock is reduced in a single database step: when one surprise is left and two people tap at once, only one gets it.

### Login without passwords
Email codes, built from scratch: only fingerprints are stored, codes expire and burn after five tries.

### A back office for the team
Add restaurants by tapping the map, and hand over a surprise with the customer's four-letter code.

![All restaurants, with the filters: type, price, vegetarian, open now](./app-otramesa/explore-restaurants.png) ![The back office: bookings and hand-over by code](./app-otramesa/back-office.png)
*Explore every restaurant — or only those open right now, in Barranquilla time. Every booking lands in the back office.*

## Built to be trusted

Nightly backups tested by restoring them, rate limits, automatic deletion after 30 days, two watchdogs, and a robot that walks the whole journey — reserve, hand over, cancel, delete account — after every change.

## Stack

### Front-end
React · Vite · Leaflet + OpenStreetMap

### Back-end
Node.js · Express · Postgres · MongoDB

### Infrastructure
Hetzner Germany · Docker · Caddy · Monorepo
