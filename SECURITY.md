# Security

Report suspected vulnerabilities privately to **work.dwijkansagara@gmail.com**.

This exported Next.js experience is static and login-free. It has no passwords, JWTs, uploads, payments, webhooks, database client, forms, or arbitrary server-side URL fetching. React escapes displayed text and the project does not render user-controlled HTML. The shared appreciation API uses exact origins, request-intent checks, parameterized SQL, durable rate limiting, salted identifiers, restricted database privileges, and server-held secrets.

Future authentication, upload, webhook, server-fetch, or client-database work must implement the matching workspace security gates before release. Keep dependencies patched, disable production source maps, remove default credentials, redact logs, and enable MFA on privileged provider accounts.
