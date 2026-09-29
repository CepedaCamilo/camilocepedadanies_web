---
titulo: Privater Workspace — Sicher von Anfang an.
tipo: software
categoria: Produktdesign · Full-Stack · Sicherheit
año: 2026
resumen: Ein privater Workspace für Anwendungen, die verifizierten Zugang, geschützte Daten und einen sicheren Umgang mit Dateien brauchen.
disciplinas: [Security by Design, Verifizierter Zugang, Postgres RLS, Privater Speicher, Signierte Links, Rollen & Rechte, DSGVO]
enlace: /files-live.html
textoEnlace: Live-Demo ausprobieren
orden: 30
---

Ich habe das gesamte System gestaltet und entwickelt — Authentifizierung, Berechtigungen, privaten Speicher und Deployment.

![Sichere Anmeldung mit einer geschäftlichen E-Mail](../app-archivos/claro-acceso.png) ![Eingabe des Einmalcodes](../app-archivos/oscuro-codigo.png)
*Der Zugang beginnt mit einer verifizierten E-Mail: ein Einmalcode, nur wenige Minuten und nur einmal gültig.*

## Security by Design

Der Zugang wird über Einmalcodes per E-Mail verifiziert.\
Daten sind auf Datenbankebene durch Row-Level-Security geschützt.\
Dateien bleiben privat und lassen sich über ablaufende, signierte Links teilen.

## Was ich gebaut habe

### Verifizierter Zugang
Anmeldung ohne Passwort.

### Private Daten
Nutzerdaten, durch Datenbankregeln voneinander getrennt.

### Geschützte Dateien
Private Uploads mit ablaufenden Freigabelinks.

### Rollen & Rechte
Zugriff wird auf dem Server durchgesetzt.

![Private Dateien im hellen Modus](../app-archivos/claro-espacio.png) ![Private Dateien und ein ablaufender Link im dunklen Modus](../app-archivos/oscuro-espacio.png)
*Jede Datei ist standardmäßig privat. Beim Teilen entsteht ein sicherer Link, der von selbst abläuft.*

## Als Fundament gebaut

Gedacht als wiederverwendbare Basis für Kundenportale, interne Tools und Produkte, die mit privaten Nutzerdaten oder Dokumenten arbeiten.

## Stack

### Front-end
React · Vite

### Back-end
Supabase · Postgres · Auth · Storage

### Infrastruktur
Hetzner Deutschland · Caddy
