# ذِمّة | Zimmah

Personal Debt & IOU Manager, RTL and offline-first PWA.

## What is included
- Email/password Firebase Authentication when Firebase config is provided.
- People and transaction management.
- Balances derived from immutable transaction history.
- Partial payments as separate transactions.
- IndexedDB local persistence and an offline sync queue.
- Automatic sync on reconnect/open.
- PWA manifest + service worker.
- Search, filters, due-date status, reports, CSV export, print-to-PDF, backup/restore.
- Firestore rules scoped to the authenticated user's UID.

## Firebase setup
1. Create a Firebase project and enable Email/Password Authentication.
2. Create a Web App in Firebase Console.
3. Copy its Web SDK configuration into `js/config.js`.
4. Create Firestore and deploy `firestore.rules`.
5. Serve the repository over HTTPS (or localhost). Do not open `index.html` via `file://` because ES modules, IndexedDB, and service workers need a web origin.

Firebase browser configuration values identify the project; server credentials must never be placed in this repository.

## Local-first behavior
The UI reads from IndexedDB first. Authenticated mutations are queued with stable UUIDs and retried after reconnect. Firestore IDs are the same transaction IDs used locally, preventing duplicate transaction creation during retries.

## Production notes
- Add Firebase Storage rules and attachment upload UI before enabling production attachments.
- Browser notifications and WebAuthn/PIN lock should be enabled only over secure contexts and feature-detected per browser.
- The current remote pull is capped at 500 records per entity; add cursor pagination before operating at large scale.
