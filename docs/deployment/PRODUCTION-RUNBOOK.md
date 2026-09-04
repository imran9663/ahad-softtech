# Production Runbook

## Before deployment

- [ ] Domain and DNS records approved.
- [ ] TLS certificate active.
- [ ] PostgreSQL production database created and backups enabled.
- [ ] Strong Strapi secrets generated per environment.
- [ ] `cms/.env` supplied through the secret manager.
- [ ] `ENABLE_PUBLIC_API_PERMISSION_BOOTSTRAP=false`.
- [ ] `ENABLE_CMS_SEED=false` after initial content setup.
- [ ] Email provider credentials configured.
- [ ] `VITE_CMS_URL` points to the production CMS URL.
- [ ] GA4 measurement ID configured if analytics is enabled.
- [ ] CMS admin accounts reviewed and least-privilege roles assigned.

## Deploy

1. Build the frontend and CMS from the release commit.
2. Start/update PostgreSQL.
3. Start/update Strapi.
4. Wait for `/api/health` to report database `ok`.
5. Start/update frontend.
6. Put TLS reverse proxy/CDN/WAF in front of the public services.
7. Run smoke tests.

## Smoke tests

- [ ] `/`
- [ ] `/about`
- [ ] `/services`
- [ ] representative service detail
- [ ] `/case-studies`
- [ ] `/blog`
- [ ] `/careers`
- [ ] `/contact`
- [ ] `/request-quote`
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`
- [ ] `/api/health`
- [ ] contact submission reaches CMS and notification inbox
- [ ] quote submission reaches CMS and notification inbox
- [ ] career submission stores application and resume securely

## Rollback

Rollback to the previous release artifact/container image. Do not delete the database volume during an application rollback. Restore a database backup only when a migration/data issue requires it and after confirming the recovery point.

## Backups

At minimum maintain automated PostgreSQL backups plus periodic restore tests. A backup that has never been restored is not considered verified.

## Monitoring

Monitor:

- HTTP 5xx rate
- CMS `/api/health`
- PostgreSQL health/storage
- container restarts
- disk usage
- email delivery failures
- form submission errors
- frontend uptime
- certificate expiry

## Incident handling

1. Confirm scope and timestamp.
2. Check frontend/CMS/database health.
3. Inspect recent release and logs.
4. Roll back application artifacts if appropriate.
5. Preserve evidence/logs.
6. Restore database only if necessary.
7. Verify forms and primary conversion paths after recovery.
