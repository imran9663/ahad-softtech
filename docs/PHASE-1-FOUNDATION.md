# Phase 1 — Foundation & Architecture

## Objective
Establish the AHAD Softtech monorepo foundation for a public corporate website backed by Strapi 5 and PostgreSQL.

## Source decisions
- Frontend: HTML + Tailwind CSS + JavaScript
- CMS/API: Strapi 5
- Database: PostgreSQL
- API: REST-first
- Environments: Development → Staging → Production
- CMS is the website/content management layer, not the HRMS, ITSM, payroll or BPO operations platform.

## Completed foundation
- Monorepo directories established.
- Root environment template established.
- Frontend package/build entry point established.
- CMS package/config foundation established.
- Git ignore rules established for secrets, dependencies, builds and uploads.
- Architecture documentation retained under `docs/`.

## Phase 1 implementation checklist
- [x] Repository structure
- [x] Frontend application entry point
- [x] CMS package foundation
- [x] PostgreSQL environment contract
- [x] Environment variable templates
- [x] Secret exclusion from Git
- [ ] Install dependencies
- [ ] Initialize a real Strapi 5 application/runtime
- [ ] Provision local PostgreSQL database
- [ ] Add Docker/local infrastructure (only if selected)
- [ ] Establish CI/CD
- [ ] Establish staging and production infrastructure
- [ ] Security hardening

## Acceptance gate
Phase 1 is considered implementation-complete only after the runtime can start locally, the frontend can build, Strapi can connect to PostgreSQL, and secrets are supplied through environment configuration rather than source control.
