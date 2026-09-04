# AHAD Softtech Corporate Website + CMS

Strapi 5 + PostgreSQL CMS foundation and frontend workspace for the AHAD Softtech corporate website.

## Project Progress

### Phase 1 — CMS & Platform Foundation

- [x] Phase 1.1 — Foundation & Architecture
- [x] Phase 1.2 — Database & Strapi Bootstrap
- [x] Phase 1.3 — Strapi Admin, Roles & Permissions foundation
- [x] Phase 1.4 — Database & CMS Content Model Foundation
- [x] Phase 1.5 — Remaining CMS Content Models
- [x] Phase 1.6 — CMS API Integration & Frontend Consumption
- [x] Phase 1.7 — Public API Permissions & CMS Seed Data

**Phase 1 status: Foundation complete.**

### Phase 2 — Corporate Website UI/UX & Frontend Implementation

- [x] Phase 2.1 — Design System, Brand Tokens & Responsive Layout Foundation
- [x] Phase 2.2 — Global Header, Navigation, Footer & Shared UI
- [x] Phase 2.3 — Homepage & Conversion Sections
- [x] Phase 2.4 — About, Services Index & Service Detail Pages
- [x] Phase 2.5–2.8 — Completion & Hardening (Case Studies, Testimonials, Careers, Blog, Forms, CMS states, SEO, Accessibility, Analytics & Performance)

**Phase 2 status: Website implementation, content routes and frontend hardening complete.**

### Phase 3 — Integration, QA & Production Readiness

- [x] Phase 3.1–3.6 — Production Integration, QA & Deployment foundation

### Phase 4 — Business Integrations Foundation

- [x] Phase 4 — Provider-neutral integration contracts and activation controls
- [ ] CRM provider selection + live integration
- [ ] HRMS provider selection + live integration
- [ ] WhatsApp provider selection + live integration
- [ ] Marketing automation provider selection + live integration
- [x] Advanced lead-scoring foundation
- [x] Multi-language content/routing foundation
- [x] Advanced analytics event taxonomy foundation
- [x] Content approval workflow foundation

**Phase 4 status: Integration architecture foundation complete. Live third-party integrations require confirmed providers, credentials, data mappings, consent/legal approval and UAT.**

## Current CMS domains

- Site settings, navigation and pages
- Services
- Case studies, testimonials and client logos
- FAQs
- Blog, authors, categories and tags
- Careers, job openings and applications
- Website leads
- Redirects

## Architecture

- CMS: Strapi 5
- Database: PostgreSQL
- Frontend: HTML + Tailwind CSS + JavaScript
- API: REST
- Deployment path: Development → Staging → Production
- Content model: Structured content + controlled Dynamic Zones

See `docs/PHASE-1.7-CMS-PERMISSIONS-SEED.md`, `docs/security/PUBLIC-API-PERMISSIONS.md`, `docs/PHASE-3-PRODUCTION-INTEGRATION-QA.md` and `docs/deployment/PRODUCTION-RUNBOOK.md` for the implementation, security boundary and production procedures.

**Phase 3 status: Production integration, QA and deployment foundation complete. Actual staging/production launch requires the client infrastructure, secrets, DNS/TLS, email provider and backup environment.**
