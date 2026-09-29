---
titulo: Yaku — Bestellen am Tisch
tipo: software
categoria: Produktdesign · Full-Stack
cliente: Yaku Restaurante, Hamburg
año: 2026
resumen: QR-Bestellung für ein peruanisch-mexikanisches Restaurant in Hamburg — eine Gäste-App mit Fotos im Mittelpunkt, auf Deutsch und Englisch, und ein Küchenbildschirm, der jede Bestellung in Echtzeit empfängt. Von mir gestaltet, entwickelt und gehostet.
disciplinas: [Produktdesign, UI-Design, React, Supabase Realtime, Postgres RLS, DSGVO]
enlace: https://yaku.danies.trade/?mesa=demo
textoEnlace: Live-Demo ausprobieren
orden: 10
---

## Die Aufgabe

Yaku hatte bereits eine starke Marke und eine großartige Küche. Vor Jahren habe ich für das Restaurant einen *Mobile Ordering Prototype* gestaltet — aber nur als Visuals. Diesmal war das Ziel ein **funktionierendes Produkt**, das die Inhaber mit echten Gästen testen können, ohne die Art der Bezahlung zu ändern: Die Gäste bestellen am Tisch und bezahlen wie gewohnt beim Service.

## Wo alles begann

![Der ursprüngliche Mobile Ordering Prototype — nur Visuals](../app-yaku/prototipo-recorte.png)
*Vor der App: der ursprüngliche Mobile Ordering Prototype — damals nur Visuals.*

![Die responsive Website von Yaku](../app-yaku/web-yaku.jpg)
*Die responsive Website des Restaurants — Teil des Markenerlebnisses, das ich für Yaku gestaltet habe.*

[Website von Yaku ansehen ↗](https://www.yaku-restaurante.de)

## Was ich gebaut habe

- **Gäste-App** — QR-Code am Tisch scannen, durch eine Karte mit Fotos blättern, ein Gericht öffnen, eine Notiz für die Küche hinzufügen, die Bestellung senden und ihren Status live verfolgen. Auf Deutsch und Englisch, hell und dunkel.
- **Küchenbildschirm** — eine Tablet-Ansicht, in der neue Bestellungen mit einem Ton ankommen. Ein Tipp schiebt eine Bestellung von *neu* über *in Zubereitung* zu *serviert*, und das Handy des Gastes aktualisiert sich von selbst. Gerichte lassen sich als ausverkauft markieren.
- **QR-System** — jeder Tisch hat seinen eigenen geheimen Code, gedruckt auf einer Karte. Ohne ihn kann niemand bestellen.

![Karte im hellen Modus, mit der Leinwand-Textur von Yaku](../app-yaku/claro-carta.png) ![Karte im dunklen Modus](../app-yaku/oscuro-carta.png)
*Die Karte in beiden Modi: Der helle nutzt die Leinwand-Textur der Yaku-Website, der dunkle ein warmes Schwarz, das die Food-Fotografie leuchten lässt.*

![Gericht im hellen Modus](../app-yaku/claro-plato.png) ![Gericht im dunklen Modus](../app-yaku/oscuro-plato.png)
*Jedes Gericht öffnet sich im Vollbild — das Foto verkauft. Gäste können der Küche eine Notiz hinterlassen.*

![Bestellübersicht](../app-yaku/claro-pedido.png) ![Live-Status der Bestellung](../app-yaku/oscuro-estado-preparando.png)
*Bestellung prüfen, absenden und zusehen, wie der Status weiterwandert, während die Küche arbeitet.*

## Designentscheidungen

- **Fotografie zuerst.** Der Prototyp zeigt nur Gerichte mit Foto und beginnt mit einem *Chef's Pick*. Eine Speisekarte ist ein Verkaufswerkzeug.
- **Zwei Stimmungen, eine Marke.** Der dunkle Modus nutzt ein warmes Schwarz (`#121110`) statt reinem Schwarz, damit er zum dunklen Holz der Food-Fotos passt. Der helle Modus nutzt die Leinwand-Textur des Restaurants. Die Akzentfarbe ist *Ají amarillo* — die peruanische gelbe Chili aus ihren Gerichten.
- **Marken-Details.** Die Display-Schrift von Yaku und ihr handgezeichnetes „Y“ als App-Icon.
- **Ein Küchenbildschirm für volle Hände.** Hoher Kontrast, große Buttons, die Tischnummer groß genug, um sie quer über den Pass zu lesen, und hervorgehobene Gäste-Notizen, damit niemand *„ohne Koriander“* übersieht.

## Architektur

- **Front-end:** React + Vite, eine App für Gäste (`/`) und Küche (`/cocina`).
- **Back-end:** Supabase, selbst gehostet auf meinem eigenen Hetzner-Server in Nürnberg — Postgres, Realtime und Auth — hinter Caddy mit automatischem HTTPS.
- **Echtzeit:** Die Küche abonniert Änderungen an Bestellungen und erhält sie sofort; der Status beim Gast aktualisiert sich alle paar Sekunden.
- **Sicher von Anfang an:** Row-Level-Security auf jeder Tabelle. Gäste können eine Bestellung nur über eine Datenbankfunktion anlegen, die den geheimen Code des Tisches prüft und begrenzt, wie viele Bestellungen ein Tisch in wenigen Minuten senden kann. Die Küche hat eine eigene Rolle — sie kann Bestellungen sehen und weiterschieben, ist aber kein Admin. Die Regeln habe ich mit automatisierten Tests als anonymer Besucher geprüft.

## Datenschutz (DSGVO)

Gäste legen kein Konto an, und es werden keine personenbezogenen Daten erhoben — nur ein Tisch und ein paar Gerichte. Alles läuft auf einem Server in Deutschland, und Demo-Bestellungen löschen sich jede Nacht selbst.

## Status

**Live-Prototyp**, der derzeit von den Inhabern getestet wird. Nächste Schritte: Allergeninformationen für alle Gerichte (nach EU-Recht vorgeschrieben), eine Karte, die das Restaurant selbst bearbeiten kann, und eine Anbindung an die Kasse.
