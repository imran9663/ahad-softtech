# Supabase PostgreSQL Integration

## Objective

Use Supabase as the managed PostgreSQL provider for AHAD Softtech while retaining Strapi as the CMS and REST API layer.

## Architecture

```text
Browser
  |
  v
Frontend (Vite)
  |
  | HTTP / REST
  v
Strapi 5
  |
  | PostgreSQL connection
  v
Supabase PostgreSQL
```

The frontend must never connect directly to the database or receive `DATABASE_URL`.

## Connection mode

Use Supabase **Session Pooler** for the persistent Strapi backend. Supabase documents Session Pooler as the IPv4-compatible option for persistent application backends. Transaction Pooler is intended for transient/serverless traffic.

## Configuration

`cms/config/database.js` accepts `DATABASE_URL` as the primary connection configuration and retains field-based PostgreSQL variables as a fallback.

Required local values:

```text
DATABASE_CLIENT=postgres
DATABASE_URL=<Supabase Session Pooler connection string>
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

For production, use the Supabase CA certificate and set:

```text
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true
DATABASE_SSL_CA=<path to CA certificate>
```

## Schema ownership

Strapi owns CMS tables, content types, and migrations. Supabase provides managed PostgreSQL infrastructure. Supabase Auth/Data API are not required for the core CMS architecture.

## Initialization

1. Create Supabase project.
2. Copy Session Pooler connection string from the Supabase Connect panel.
3. Create `cms/.env` from the example.
4. Add real database credentials and Strapi secrets.
5. Run `npm install` from repository root.
6. Run `npm run dev:cms`.
7. Complete Strapi Admin initialization.
8. For intentional seed/permission initialization, temporarily enable Phase 1.7 bootstrap flags.
9. Disable those flags after initialization.

## Security checklist

- [ ] `DATABASE_URL` is not committed.
- [ ] `DATABASE_URL` is never exposed through `VITE_*` variables.
- [ ] SSL is enabled.
- [ ] Production uses CA verification where practical.
- [ ] Supabase network restrictions are reviewed for production.
- [ ] Database password is stored in a secret manager/deployment environment.
- [ ] Strapi public permissions expose only intended content.
- [ ] Leads and job applications remain private.
