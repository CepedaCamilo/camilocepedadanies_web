---
titulo: Secure by default — login, data and files
tipo: software
categoria: Product design · Full-stack · Security
año: 2026
resumen: In any app, the most valuable thing is the data behind it. A workspace where every sign-in is verified, every record is guarded by rules inside the database, and every uploaded file is handled according to European data protection law.
disciplinas: [Security by Design, Verified Sign-in, Protected Database, Private Storage, Signed URLs, Roles & Permissions, DSGVO]
enlace: /files-live.html
textoEnlace: Try the live demo
orden: 120
---

## Why security comes first

In any app, the most valuable thing is not the interface — it is the data behind it: who your users are, what they write, the documents they trust you with. If that data is exposed, no design can make up for it.

For a company today, the most expensive problems rarely start with a sophisticated attack. They start with something ordinary: a reused password, a phishing email, a file shared with a public link that nobody remembers, a former employee who still has access, a secret key left in the wrong place.

At the same time, the stakes keep rising. Ransomware increasingly targets small and mid-sized businesses, not only large corporations. European rules such as the DSGVO (GDPR) and the NIS2 directive make companies responsible for how they protect personal data and their own systems. And clients increasingly ask a simple question before they sign: *where is our data, and who can see it?*

That is why this project does not treat security as a feature added at the end. **Every design decision starts from the assumption that something will go wrong** — a password leaks, a link is forwarded, someone tampers with the browser — and asks how the system should behave when it does.

## Three layers of protection: login, data and files

Security is not one feature but a chain, and a chain is only as strong as its weakest link. This system protects the three places where data is most at risk — the moment someone signs in, the database where records live, and the files people upload — plus the infrastructure underneath.

### 1. Verified sign-in

Every access is verified: to sign in, a person receives a one-time six-digit code at their email address, and the code works only once and only for a short time. Only whoever has access to that inbox can get in. As a side effect, there is no stored password that could be reused, guessed, phished or leaked in a data breach — the most common way accounts are taken over.

### 2. A protected database

Every person has their own private data and their own private folder. The rule *"you can only see your own files"* does not live in the interface, where it could be bypassed: it lives **in the database itself** (row-level security). Even someone who manipulates the browser or calls the server directly cannot read another person's files.

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

## Built on the regulation

Good intentions are not enough — European data protection law sets concrete duties, and the system is designed around them:

| DSGVO (GDPR) | How the system meets it |
|---|---|
| Art. 25 — data protection by design and by default | Files are private unless shared; rules live in the database from day one, not added later. |
| Art. 32 — security of processing | Verified sign-in, encrypted connections (HTTPS), role-based access, secrets kept on the server. |
| Art. 17 — right to erasure | People can delete their account themselves; their files and data are removed in one step. |
| Art. 28 — processors | A data processing agreement (AVV) with the hosting provider is signed. |
| Data minimisation | Only an email address to sign in — no names, phone numbers or tracking are required. |

## What if something goes wrong?

| Risk | How the system responds |
|---|---|
| Someone tries to take over an account | Access requires a one-time code sent to the user's email — single-use and short-lived. There is no stored password to steal or reuse. |
| A share link is forwarded to the wrong person | The link expires after one hour. |
| A user tampers with the browser to see other people's files | The database refuses — the rule lives on the server, not in the interface. |
| Someone finds the key in the website's code | It is a public key with limited rights; the powerful key never leaves the server. |
| A non-admin tries to create or delete users | The server function checks the role and rejects the request. |
| An employee leaves | Deleting the account removes their access and their files in one step. |
| Data ends up outside the EU | Files and database live on a server in Germany. |

## What I built

Three small apps that work as one system:

- **Verified sign-in** — a one-time six-digit code sent from my own mail domain, plus a page where people can delete their account.
- **Private files** — drag and drop for images and PDFs up to 10 MB, a private folder per person, and links that expire.
- **Admin back office** — create, rename and remove users, with roles and server-side checks.

## Designing security people can feel

Security only works when people understand it without reading a manual. The interface makes it visible in small, calm moments: a padlock and the word *Private* next to every file; a countdown on every shared link; a clear confirmation before anything destructive. No jargon, no fear — just clarity about what is protected and for how long.

## Made for companies

This kind of system fits wherever sensitive documents move between people who already know each other: HR files, contracts and invoices, client deliverables, internal documentation, operational photos from the field. It is small, understandable, and hosted in Germany — so a company can know exactly where its data is and who can see it.

## Try it

The [live demo](/files-live.html) follows the same flow as the real system: enter your email and you receive a **real one-time code** from my server. Verify it, drop a file and create a link that expires.

The demo applies the same principles it presents. It is a separate service that creates no account and gives no access to the real system. Your email address and the code are never stored in plain text — only unreadable fingerprints, deleted automatically after 24 hours. Codes are limited per address, per connection and per day, so nobody can use the demo to flood someone else's inbox, and each code allows only five attempts. The files you choose **never leave your browser**: nothing is uploaded, and reloading the page starts again from zero.

## Architecture

- **Front-end:** React + Vite.
- **Back-end:** Supabase, self-hosted on a Hetzner server in Nuremberg — Postgres, Auth and Storage — behind Caddy with automatic HTTPS.
- **Security rules in the database:** row-level security on every table and on the file storage.
- **Server functions:** Edge Functions for everything that needs elevated rights (creating and deleting users, deleting your own account).
- **Email:** one-time codes sent through a transactional mail provider from my own domain.

## Next steps

Security is a process, not a finished state. The next improvements on my list: passkeys as an alternative sign-in, an audit log that records who opened or shared which file, and automatic malware scanning for uploads.
