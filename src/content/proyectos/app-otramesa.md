---
titulo: Otra Mesa — Good food deserves another table.
tipo: software
categoria: Product design · Brand · Full-stack
año: 2026
resumen: A near-real food-rescue product for Barranquilla — three apps, real reservations, simulated payments and a QR pick-up, on a stack I built and host myself.
disciplinas: [Product Design, Brand Identity, Design System, Node.js API, Postgres, MongoDB Geo, Web Push, Back Office, Monorepo]
enlace: https://otramesa.danies.trade
textoEnlace: Try the live demo
enlace2: /pdf/otra-mesa-design-system.pdf
textoEnlace2: Design system PDF
orden: 25
---

I designed the brand and the product, and built three apps on one API: the customer app, a portal for the businesses and an office for the admin. Everything works for real — accounts, reservations, pick-up codes, ratings, notifications — except the money: payments are simulated with test cards.

![Discover: featured surprises first, then what's near you](./app-otramesa/discover.png) ![A surprise: the photo leads, the details follow](./app-otramesa/surprise.png)
*Restaurants offer the good food they didn't sell as "house surprises", at about a third of the price. You reserve one, pay and pick it up today.*

## Less waste, a fuller table

Every evening, good food is thrown away for one reason only: the day is over. Otra Mesa gives it a second table — at around a third of the price for people nearby, and a fair return for the restaurant instead of a loss.

### Less waste
Food that is still good is eaten, not discarded.

### A stronger local economy
Restaurants recover part of their costs and meet new neighbours; people discover places they would never have tried.

### Restaurants that do good
Saving food is a visible, generous gesture — a reason to take part that goes beyond the numbers.

A working product with made-up restaurants and wholesalers in Barranquilla, Colombia.

## A calm, clean interface

The second version is deliberately quiet: a white background, text in a single colour, one typeface, the green of the logo for the main buttons and the terracotta only for small details — stars, underlines, labels. Featured surprises come first, in slightly larger cards you swipe through; below them, smaller rows: near you, pick up soon, for dinner. On a surprise, the photo leads and the details follow in short lines — and you can see how people rate it, star by star. Times are written the way Barranquilla says them: 5:15–5:45 p. m.

![How people rate it: the average and every star, counted](./app-otramesa/surprise-ratings.png) ![Every restaurant on the map, with filters: type, price, vegetarian, open now](./app-otramesa/explore-restaurants.png)
*Ratings come only from people who actually picked up their surprise. The map shows every restaurant — or only those open right now, in Barranquilla time.*

## The design system

Every colour, size, corner and shadow comes from one shared file of tokens, used by all three apps — nine type sizes, twelve spacing steps, five radii, four shadows. I documented it as a 38-page specimen book: principles, colour with every contrast checked, type, spacing, shadows, grid, icons, and each component with its states. It is also the template for my next design systems.

![The design system: one source for all three apps](./app-otramesa/design-system-cover.png) ![Buttons and their states, with the tokens behind them](./app-otramesa/design-system-buttons.png)
*The document is written in Spanish, the language of the team it was made for.*

[View the design system (PDF, 38 pages) ↗](/pdf/otra-mesa-design-system.pdf)

## Three apps, one API

### For customers
Discover and the map, reserve and pay, a QR code for pick-up, favourites saved to the account, a rating after each pick-up and a running count of the food you have saved.

### For businesses
Apply to join and get approved; publish today's surprises or weekly templates that publish themselves (always at least 30 % off); scan the customer's QR with the phone's camera; invite the team; see the money; read the reviews — and get a notification for every new booking.

### For the admin
A summary with a 14-day chart, requests to approve or reject, restaurants, bookings, payments and payouts, users, reviews and a log of every important action.

![The business portal: today's bookings, hand-over by code or QR](./app-otramesa/business-today.png) ![The business portal: today's surprises and weekly templates](./app-otramesa/business-surprises.png)
*The portal for businesses lives on the phone at the counter. It speaks Spanish: it is made for the restaurants of Barranquilla.*

![The admin office: a summary of the last days](./app-otramesa/back-office-summary.png) ![The admin office: bookings and hand-over by code](./app-otramesa/back-office.png)
*The admin office: what was saved and charged, and every booking as it lands.*

## What I built

### The back of house
A Node.js API in front of two kitchens: Postgres as the official record, MongoDB as the compass for "near me".

### Near me, to the metre
A 2dsphere index and `$geoNear` find what's within 300 m, 1 km or 10 km — checked against the Haversine formula.

### Reservations that never oversell
Stock is reduced in a single database step: when one surprise is left and two people tap at once, only one gets it.

### Payments, simulated end to end
Authorised when you reserve, charged at pick-up, voided if you cancel, refundable by the admin — with a 20 % commission and payouts per restaurant. Only test cards are accepted, and only the last four digits are ever stored.

### Sign in with Google or an email code
OpenID Connect with PKCE, or six-digit codes built from scratch: only fingerprints are stored, codes expire and burn after five tries.

### One account, several keys
A person can own one restaurant and work at another. Invitations by email become keys at the first sign-in, and a restaurant can never lose its last owner.

### Notifications
Web Push with keys generated on the server: a new booking for the team, "your pick-up starts in 30 minutes" for the customer, and a note when a favourite publishes something.

## Built to be trusted

Nightly backups tested by restoring them, every database change rehearsed on a copy first, rate limits, automatic deletion after 30 days, two watchdogs, an installable app with an offline screen and a privacy notice that covers every data flow (GDPR). After every change, two robots walk the whole journey: 16 checks for customers, 59 for businesses and the admin.

## Stack

### Front-end
React · React Router · Vite · Leaflet + OpenStreetMap

### Back-end
Node.js · Express · Postgres · MongoDB · Web Push · Google OpenID Connect

### Infrastructure
Hetzner Germany · Docker · Caddy · Monorepo
