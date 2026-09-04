# AHAD Softtech — Project Structure

## Frontend
- `src/components/layout/` — header, navigation, footer, containers
- `src/components/sections/` — reusable CMS-driven sections: Hero, ServiceGrid, FeatureSplit, Statistics, ProcessSteps, FAQ, Testimonials, CaseStudy, LogoCloud, CTA, RichText, Media
- `src/components/ui/` — buttons, cards, accordions, inputs, states
- `src/components/forms/` — Contact, Request Quote, Career forms
- `src/pages/` — Home, About, Services, Case Studies, Careers, Blog, Contact, Quote, 404
- `src/services/` — CMS API, forms, analytics, WhatsApp
- `src/utils/` — SEO, validation, formatting, accessibility helpers
- `src/styles/` — Tailwind/global styles

## CMS
- `src/api/` — Services, Pages, Blog, Case Studies, FAQs, Testimonials, Clients, Careers, Leads, Redirects, etc.
- `src/components/` — SEO and reusable content components
- `config/` — database, server, admin, middleware configuration
- `database/` — seed/migration-related setup
- `extensions/` — controlled Strapi extensions
- `middlewares/` — security/rate limiting and request handling
- `policies/` — protected lead/application access policies

## Implementation order
1. CMS + PostgreSQL
2. Roles/permissions
3. Site settings/navigation/SEO
4. Services/pages/dynamic zones
5. Blog/case studies/FAQs
6. Careers/applications
7. Leads + protected form endpoints
8. Frontend integration
9. Analytics/WhatsApp
10. Security, backups, staging and production
