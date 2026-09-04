# Phase 1.7 — Public API Permissions & CMS Seed Data

## Objective

Close Phase 1 by configuring the public REST API boundary and providing safe, reviewable CMS seed data.

## Implemented

- Idempotent public read-permission bootstrap for website content.
- Explicit public-role deny/hardening for Lead and Job Application content types.
- Seeded Site Settings, primary navigation, service records and core page records.
- Seed content is unpublished where the content type supports draft/publish.
- Production bootstrap controls are disabled by default.
- Security documentation added for the public API boundary.

## Seed-data policy

Seed data is structural and editorial only. No fabricated testimonials, client logos, certifications, performance metrics or customer claims are introduced. Production contact details and brand claims must be verified before publishing.

## Environment flags

```text
ENABLE_PUBLIC_API_PERMISSION_BOOTSTRAP=false
ENABLE_CMS_SEED=false
```

For a development bootstrap, enable both flags for the Strapi process, start Strapi, review the Admin permissions/content, then disable them again.

## Verification status

Static validation can be performed locally. A live Strapi/PostgreSQL permission and seed run requires dependencies, database credentials and the runtime environment; this phase does not claim a live CMS boot in this workspace.
