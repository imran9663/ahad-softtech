# Phase 3 — Production Integration, QA & Deployment

Phase 3 consolidates runtime integration, form notifications, production security/performance foundations, QA, staging/UAT and deployment runbooks.

## 3.1 Runtime

- PostgreSQL 16 container definition with health checks.
- Strapi production Dockerfile.
- Frontend production Dockerfile and Nginx SPA configuration.
- CMS `/api/health` endpoint checks database connectivity.
- Production environment template separated from development defaults.

## 3.2 Forms and notifications

- Contact, quote and career submissions remain behind controlled form routes.
- Existing validation, consent, honeypot and resume restrictions remain in force.
- Optional HTTP transactional-email adapter added through environment variables.
- Email failures are logged without failing a successful lead/application persistence operation.

The email adapter is provider-neutral. Configure the actual provider contract and credentials in the deployment secret store before launch.

## 3.3 Security and performance

- Sensitive environment values are excluded from Git.
- Production CMS binds to localhost in the supplied compose topology and should sit behind TLS/reverse proxy infrastructure.
- Nginx enables gzip and browser caching for immutable-style static assets.
- Security response headers are included in the frontend proxy.
- Strapi security middleware remains enabled.
- Public API permissions from Phase 1.7 remain the content boundary; lead/application records are not exposed as public collections.

## 3.4 QA

Required pre-release checks:

1. `npm run check --workspace @ahad-softtech/frontend`
2. `node scripts/validate-phase3.mjs`
3. Build frontend and CMS in CI.
4. Start PostgreSQL and CMS in staging.
5. Verify `/api/health` returns HTTP 200.
6. Verify public content GET endpoints.
7. Verify contact/quote/career form success and validation failures.
8. Verify resume size/type restrictions.
9. Verify admin authentication and RBAC.
10. Test Chrome/Edge/Safari/Firefox and mobile breakpoints.
11. Run keyboard, focus, semantic HTML and screen-reader checks.
12. Validate title/meta/canonical/robots/OG and sitemap/robots files.
13. Run Lighthouse/PageSpeed against the staging deployment.
14. Verify 404, redirects, navigation and all primary CTAs.

## 3.5 Staging/UAT

Promote the same build artifact from CI to staging. Populate CMS staging data, complete the UAT checklist, and obtain business approval before production.

## 3.6 Production

Production requires real infrastructure values for domain/DNS, TLS, PostgreSQL storage, transactional email, analytics and optional CDN/WAF. The repository provides the configuration/runbook; actual launch must be performed against those accounts.
