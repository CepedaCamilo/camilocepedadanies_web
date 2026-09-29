---
titulo: Private Files — Security first, by design
tipo: software
categoria: Product design · Full-stack · Security
año: 2026
resumen: A private workspace to sign in without a password, store files and share them through links that expire. Three apps — sign-in, file storage and an admin back office — designed as one system around a single question - what happens if something goes wrong?
disciplinas: [Security by Design, Passwordless Auth, Private Storage, Signed URLs, Postgres RLS, Roles & Permissions, DSGVO]
enlace: /files-live.html
textoEnlace: Try the live demo
orden: 120
---

## Why security comes first

For a company today, the most expensive problems rarely start with a sophisticated attack. They start with something ordinary: a reused password, a phishing email, a file shared with a public link that nobody remembers, a former employee who still has access, a secret key left in the wrong place.

At the same time, the stakes keep rising. Ransomware increasingly targets small and mid-sized businesses, not only large corporations. European rules such as the DSGVO (GDPR) and the NIS2 directive make companies responsible for how they protect personal data and their own systems. And clients increasingly ask a simple question before they sign: *where is our data, and who can see it?*

That is why this project does not treat security as a feature added at the end. **Every design decision starts from the assumption that something will go wrong** — a password leaks, a link is forwarded, someone tampers with the browser — and asks how the system should behave when it does.

## Security principles, designed into the product

### 1. No passwords to steal

People sign in with a one-time six-digit code sent by email. There is no password to reuse, guess, phish or leak in a data breach — and nothing for users to forget. A code works only once and only for a short time.

### 2. Private by default

Every person has their own private folder. The rule *"you can only see your own files"* does not live in the interface, where it could be bypassed: it lives **in the database itself** (row-level security). Even someone who manipulates the browser or calls the server directly cannot read another person's files.

### 3. Links that expire

Files are never public. To share one, the server creates a **signed link that expires after one hour**. A forwarded or leaked link stops working on its own — no forgotten public URLs lingering for years.

### 4. Secrets stay on the server

The browser only ever holds a public key with limited rights. The powerful key that can create and delete users is kept **exclusively on the server**, inside small server functions. Before doing anything dangerous, those functions check that the person asking is really an admin.

### 5. Least privilege and clear roles

A back office lets admins create and remove users. Roles (*user*, *admin*) decide what each person can do, and the checks happen on the server — never trusted to the browser. Deleting someone requires an explicit confirmation, so critical actions are hard to trigger by accident.

### 6. The right to be forgotten

People can delete their own account. In one step, the server removes their files, their data and their access. When someone leaves a company, their access and their data leave with them.

### 7. Data sovereignty

Everything runs on **my own server in Nuremberg, Germany** — not on a third-party platform abroad. A data processing agreement with the hosting provider is signed, the hosting account is protected with two-factor authentication, the firewall only opens the ports that are strictly needed, all traffic is encrypted with HTTPS, and server logs rotate automatically so they do not grow into a second copy of personal data.

## What if something goes wrong?

| Risk | How the system responds |
|---|---|
| A password is phished or leaked | There are no passwords. Codes are single-use and short-lived. |
| A share link is forwarded to the wrong person | The link expires after one hour. |
| A user tampers with the browser to see other people's files | The database refuses — the rule lives on the server, not in the interface. |
| Someone finds the key in the website's code | It is a public key with limited rights; the powerful key never leaves the server. |
| A non-admin tries to create or delete users | The server function checks the role and rejects the request. |
| An employee leaves | Deleting the account removes their access and their files in one step. |
| Data ends up outside the EU | Files and database live on a server in Germany. |

## What I built

Three small apps that work as one system:

- **Sign-in** — passwordless, with a six-digit code sent from my own mail domain, plus a page where people can delete their account.
- **Private files** — drag and drop for images and PDFs up to 10 MB, a private folder per person, and links that expire.
- **Admin back office** — create, rename and remove users, with roles and server-side checks.

## Designing security people can feel

Security only works when people understand it without reading a manual. The interface makes it visible in small, calm moments: a padlock and the word *Private* next to every file; a countdown on every shared link; a clear confirmation before anything destructive. No jargon, no fear — just clarity about what is protected and for how long.

## Made for companies

This kind of system fits wherever sensitive documents move between people who already know each other: HR files, contracts and invoices, client deliverables, internal documentation, operational photos from the field. It is small, understandable, and hosted in Germany — so a company can know exactly where its data is and who can see it.

## Try it

The [live demo](/files-live.html) follows the same flow as the real system: enter any email, use the demo code, drop a file and create a link that expires. It is private by design — your files **never leave your browser**, nothing is uploaded or stored, and reloading the page starts again from zero. The real system stays closed, as it would inside a company.

## Architecture

- **Front-end:** React + Vite.
- **Back-end:** Supabase, self-hosted on a Hetzner server in Nuremberg — Postgres, Auth and Storage — behind Caddy with automatic HTTPS.
- **Security rules in the database:** row-level security on every table and on the file storage.
- **Server functions:** Edge Functions for everything that needs elevated rights (creating and deleting users, deleting your own account).
- **Email:** one-time codes sent through a transactional mail provider from my own domain.

## Next steps

Security is a process, not a finished state. The next improvements on my list: passkeys as an alternative sign-in, an audit log that records who opened or shared which file, and automatic malware scanning for uploads.
