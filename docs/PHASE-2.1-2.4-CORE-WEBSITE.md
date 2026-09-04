# Phase 2.1–2.4 — Core Website

## Scope

This merged milestone implements the first four Phase 2 sub-phases as one coherent frontend package:

1. Design system, brand tokens and responsive layout foundation
2. Global header, navigation, footer and shared UI
3. Homepage and conversion-oriented sections
4. About, services index and reusable service detail pages

## Design direction

The visual system follows the supplied website requirements: premium, professional, reliable, global, human, operationally capable and technology-enabled. It deliberately avoids generic call-centre stock imagery and avoids fabricating metrics, awards, certifications or client names.

## Frontend architecture

- Vanilla JavaScript modules with Vite
- CSS design tokens and responsive component primitives
- CMS-first content consumption with a safe editorial fallback
- Reusable header/footer/hero/service/process/FAQ/CTA sections
- Service detail template shared across all core services
- Accessible mobile navigation with keyboard-friendly native controls

## Implemented routes

- `/`
- `/about`
- `/services`
- `/services/bpo-services`
- `/services/customer-support`
- `/services/technical-support`
- `/services/back-office-operations`
- `/services/data-operations`
- `/services/software-development`
- `/services/digital-solutions`

`/services/back-office` is also accepted for compatibility with the seeded CMS slug.

## Content safety

The homepage uses capability/proof language rather than invented performance metrics. CMS content remains authoritative when available; the fallback content is only a presentation-safe baseline until approved editorial content is published.

## Validation

- JavaScript source files syntax checked with Node
- CSS checked for structural completeness
- Project remains compatible with the existing Strapi REST services
- Live Strapi/PostgreSQL runtime is not claimed as verified in this workspace
