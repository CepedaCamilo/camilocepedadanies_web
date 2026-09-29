---
titulo: Echtzeit-Chat — Ein Gespräch, in Echtzeit gebaut.
tipo: software
categoria: Produktdesign · Full-Stack
año: 2026
resumen: Eine wiederverwendbare Messaging-Ebene für digitale Produkte, in denen angemeldete Nutzer sofort miteinander kommunizieren müssen.
disciplinas: [Interaction Design, React, Supabase Realtime, Präsenz, Postgres RLS, Selbst gehostet]
enlace: /chat-live.html
textoEnlace: Live-Demo ausprobieren
orden: 20
---

Ich habe das gesamte System gestaltet und entwickelt — Interface, Echtzeit-Nachrichten, Präsenz, Authentifizierung, Zugriffskontrolle und Deployment.

![Chat-Gespräch im hellen Modus](../app-chat/claro-conversacion.png) ![Chat-Gespräch im dunklen Modus](../app-chat/oscuro-conversacion.png)
*Dasselbe Gespräch im hellen und dunklen Modus — die eigenen Nachrichten rechts, die der anderen links.*

## Gebaut, um in anderen Produkten zu leben

Der Chat ist als flexible Kommunikationskomponente gedacht, nicht als eigenständiges soziales Netzwerk.

Er kann Gespräche zwischen Käufern und Verkäufern, Kunden und Dienstleistern, Community-Mitgliedern, Mitarbeitenden oder beliebigen anderen Beteiligten innerhalb eines digitalen Produkts tragen.

Der Kontext ändert sich. Die Grundbedürfnisse bleiben dieselben: Identität, Präsenz, sofortige Zustellung und kontrollierter Zugriff.

## Was ich gebaut habe

### Echtzeit-Nachrichten
Nachrichten erscheinen sofort, ohne neu zu laden.

### Präsenz
Alle sehen, wer gerade online ist.

### Zugang ohne Passwort
Die Anmeldung erfolgt über einen Einmalcode per E-Mail.

### Sicherheit auf Datenbankebene
Autorschaft, Zeitstempel und Zugriffsregeln werden über Postgres RLS durchgesetzt.

### Automatische Aufbewahrungsfristen
Nachrichten können je nach Anforderung des Produkts automatisch ablaufen.

![Tipp-Anzeige nach dem Senden einer Nachricht](../app-chat/claro-escribiendo.png) ![Begrüßungsnachricht im dunklen Modus](../app-chat/oscuro-bienvenida.png)
*Kleine Signale machen ein Gespräch lebendig: eine Tipp-Anzeige, eine Zustellbestätigung und eine erste Nachricht, die zum Schreiben einlädt.*

## Ausprobieren

Die öffentliche Demo läuft vollständig im Browser, es wird also nichts gespeichert.

Die vollständige Umsetzung ergänzt angemeldete Nutzer, dauerhafte Echtzeit-Kommunikation, Zugriffsregeln in der Datenbank und automatische Aufbewahrungsfristen für Nachrichten.

## Stack

### Front-end
React · Vite

### Back-end
Supabase · Postgres · Realtime

### Infrastruktur
Hetzner · Caddy · Selbst gehostet
