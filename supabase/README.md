# AHAD Softtech — Supabase PostgreSQL

Supabase is used as the managed PostgreSQL database for Strapi. The frontend does **not** connect directly to Supabase for CMS content; it continues to call Strapi's REST API.

## Recommended connection mode

Use the **Supabase Session Pooler** connection string for the long-lived Strapi backend. Supabase documents Session Pooler as the IPv4-friendly option for persistent backends. Transaction Pooler is intended for transient/serverless traffic and should not be the default for Strapi.

Get the connection string from **Supabase Dashboard → Connect → Session pooler** and set it as `DATABASE_URL` in `cms/.env`.

Example shape:

```text
postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-<REGION>.pooler.supabase.com:5432/postgres
```

Do not commit the password or any `.env` file.

## SSL

Set:

```text
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

for the simplest local setup. For production, download the Supabase CA certificate and set `DATABASE_SSL_CA`; then use:

```text
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true
```

This enables certificate verification.

## Database ownership

Strapi owns its CMS schema and migrations. Do not manually recreate Strapi tables through the Supabase Table Editor unless you have a specific migration requirement.

Supabase remains the managed PostgreSQL provider; Strapi remains the CMS/API layer.

## Local development

You no longer need Docker or a local PostgreSQL server for normal development.

1. Create a Supabase project.
2. Copy the Session Pooler connection string.
3. Create `cms/.env` from `cms/.env.example`.
4. Replace `DATABASE_URL` with your real connection string.
5. Add your Strapi secrets.
6. Run `npm install` from the project root.
7. Run `npm run dev:cms`.
8. Open `http://localhost:1337/admin`.

For the first controlled initialization, you may enable the Phase 1.7 bootstrap flags temporarily:

```text
ENABLE_PUBLIC_API_PERMISSION_BOOTSTRAP=true
ENABLE_CMS_SEED=true
```

After initialization, turn both flags back to `false` and restart Strapi.

## Supabase-specific notes

- Do not expose `DATABASE_URL` to the browser.
- Do not put the database password in `VITE_*` variables.
- Do not use the Supabase `anon` key as a substitute for Strapi's database credentials.
- Keep Strapi's public API permissions as the frontend access boundary.
- If Supabase network restrictions are enabled, allow the IP/range from the environment where Strapi runs.
