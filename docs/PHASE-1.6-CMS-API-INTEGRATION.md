# Phase 1.6 — CMS API Integration & Frontend Consumption

## Objective
Connect the public frontend to the Strapi REST API through a single CMS client and establish controlled public form endpoints.

## Implemented

- Central REST client with configurable `VITE_CMS_URL`.
- Collection/single/slug query helpers.
- Strapi media URL normalization.
- Public content accessors for:
  - Site Settings
  - Navigation
  - Pages
  - Services
  - Case Studies
  - Blog Posts
  - FAQs
  - Job Openings
  - Redirects
- SEO resolution with page-level metadata falling back to Site Settings defaults.
- Controlled public form endpoints:
  - `POST /api/forms/contact`
  - `POST /api/forms/request-quote`
  - `POST /api/forms/career`
- Contact/request-quote validation, consent enforcement and honeypot handling.
- Career application validation, resume size/type checks and protected application creation path.
- CMS-driven page bootstrap and Dynamic Zone section rendering foundation.

## Public vs private boundary

The frontend does not call `/api/leads` or `/api/job-applications` directly. Those content types remain administrative/private. Public submissions use the controlled `/api/forms/*` endpoints.

Public GET access should be configured in Strapi Admin only for the minimum `find`/`findOne` operations required by the frontend. Lead and job-application find/create permissions must not be granted to the public role.

## Query strategy

The client uses Strapi REST filters, pagination, sorting and `populate=*` while the model-specific service layer defines which content is consumed by each page. This keeps CMS concerns out of page components.

## Media

CMS media is normalized to an absolute URL using `VITE_CMS_URL`. Production should serve media through the configured CDN/object-storage strategy.

## Forms

The controlled endpoints validate fields before writing to private content types. Production hardening still requires rate limiting, CAPTCHA when appropriate, transactional email notifications, structured logging and monitoring.

## Verification

Static JavaScript syntax and JSON schema validation should be run before committing. Live Strapi integration requires dependencies, database and configured environment variables; this phase does not claim a live CMS boot in this environment.
