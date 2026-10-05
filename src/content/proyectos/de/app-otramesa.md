---
titulo: Otra Mesa — Gutes Essen verdient einen zweiten Tisch.
tipo: software
categoria: Produktdesign · Marke · Full-Stack
año: 2026
resumen: Eine funktionierende Food-Rescue-App für Barranquilla — echte Reservierungen, ein QR-Abholcode und ein Back-Office, auf einem Stack, den ich selbst gebaut habe und hoste.
disciplinas: [Produktdesign, Markenidentität, Node.js-API, Postgres, MongoDB Geo, Login ohne Passwort, Back-Office, Monorepo]
enlace: https://otramesa.danies.trade
textoEnlace: Live-Demo testen
orden: 25
---

Ich habe Marke und Produkt gestaltet, die API, die zwei Datenbanken, die Kunden-App und das Back-Office entwickelt — und hoste alles auf meinem eigenen Server.

![Entdecken: eine hervorgehobene Überraschung und was in der Nähe ist](../app-otramesa/discover.png) ![Eine Überraschung, bereit zum Reservieren](../app-otramesa/surprise.png)
*Restaurants bieten gutes Essen, das sie nicht verkauft haben, als „Überraschung des Hauses“ an — für etwa ein Drittel des Preises. Man reserviert und holt noch am selben Tag ab.*

## Weniger Verschwendung, ein vollerer Tisch

Jeden Abend landet gutes Essen im Müll — aus einem einzigen Grund: Der Tag ist vorbei. Otra Mesa gibt ihm einen zweiten Tisch: für etwa ein Drittel des Preises für Menschen in der Nähe und mit einem fairen Ertrag für das Restaurant statt eines Verlusts.

### Weniger Verschwendung
Essen, das noch gut ist, wird gegessen statt weggeworfen.

### Eine stärkere lokale Wirtschaft
Restaurants holen einen Teil ihrer Kosten zurück und gewinnen neue Gäste aus der Nachbarschaft; Menschen entdecken Orte, die sie sonst nie ausprobiert hätten.

### Restaurants, die Gutes tun
Essen zu retten ist eine sichtbare, großzügige Geste — ein Grund mitzumachen, der über die Zahlen hinausgeht.

Eine funktionierende Demo mit erfundenen Restaurants und Großhändlern in Barranquilla, Kolumbien.

## Was ich gebaut habe

### Die Küche hinter den Kulissen
Eine Node.js-API vor zwei Datenbanken: Postgres als offizielles Archiv, MongoDB als Kompass für „in der Nähe“.

### In der Nähe — auf den Meter genau
Ein 2dsphere-Index und `$geoNear` finden, was im Umkreis von 300 m, 1 km oder 10 km liegt — geprüft mit der Haversine-Formel.

### Reservierungen ohne Überbuchung
Der Bestand sinkt in einem einzigen Datenbankschritt: Ist nur noch eine Überraschung da und tippen zwei gleichzeitig, bekommt sie nur eine Person.

### Login ohne Passwort
E-Mail-Codes, von Grund auf gebaut: gespeichert werden nur Fingerabdrücke, Codes laufen ab und verfallen nach fünf Versuchen.

### Ein Back-Office fürs Team
Restaurants per Tipp auf die Karte anlegen und eine Überraschung mit dem vierstelligen Code der Kundin übergeben.

![Alle Restaurants, mit Filtern: Art, Preis, vegetarisch, jetzt geöffnet](../app-otramesa/explore-restaurants.png) ![Das Back-Office: Reservierungen und Übergabe per Code](../app-otramesa/back-office.png)
*Alle Restaurants entdecken — oder nur die, die gerade geöffnet haben, in der Zeit von Barranquilla. Jede Reservierung kommt im Back-Office an.*

## Gebaut, um zu vertrauen

Nächtliche Backups, die per Wiederherstellung getestet sind, Ratenbegrenzung, automatisches Löschen nach 30 Tagen, zwei Wächter und ein Roboter, der nach jeder Änderung den ganzen Weg geht — reservieren, übergeben, stornieren, Konto löschen.

## Stack

### Front-end
React · Vite · Leaflet + OpenStreetMap

### Back-end
Node.js · Express · Postgres · MongoDB

### Infrastruktur
Hetzner Deutschland · Docker · Caddy · Monorepo
