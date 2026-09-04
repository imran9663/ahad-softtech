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

- [ ] Phase 3.1 — Strapi/PostgreSQL Runtime Integration
- [ ] Phase 3.2 — Forms, Email Notifications & Spam Protection
- [ ] Phase 3.3 — Media/CDN, Caching & Security Hardening
- [ ] Phase 3.4 — End-to-End QA, Responsive QA & Accessibility QA
- [ ] Phase 3.5 — Staging Deployment & UAT
- [ ] Phase 3.6 — Production Deployment, Monitoring & Backup Verification

### Phase 4 — Optional Business Integrations

Only implement these when there is a confirmed business requirement:

- [ ] CRM integration
- [ ] HRMS integration
- [ ] WhatsApp API
- [ ] Marketing automation
- [ ] Advanced lead scoring
- [ ] Multi-language content
- [ ] Advanced analytics dashboards
- [ ] Content approval workflow / scheduled publishing / live preview

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

See `docs/PHASE-1.7-CMS-PERMISSIONS-SEED.md` and `docs/security/PUBLIC-API-PERMISSIONS.md` for the Phase 1.7 implementation and security boundary.
