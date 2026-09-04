# Phase 2.5–2.8 — Completion & Hardening

## Scope

This combined milestone completes the public corporate website after Phase 2.1–2.4.

### 2.5 Proof & content
- Case-study listing/detail rendering
- Approved client-logo strip
- Approved testimonials
- FAQ listing
- Empty-state handling for unpublished content

### 2.6 Careers, blog and contact
- Blog listing/detail routes
- Careers listing/job detail routes
- Career application form with resume validation
- Contact and Request Quote forms
- Controlled form API boundary

### 2.7 CMS and UX completion
- CMS page rendering through controlled Dynamic Zones
- CMS navigation consumption with fallback navigation
- Redirect handling
- Loading, error and empty states
- 404 route
- Responsive layouts
- Reduced-motion support

### 2.8 SEO, accessibility, analytics and performance
- Runtime title/meta/robots/canonical tags
- Open Graph and Twitter metadata
- Optional JSON-LD from CMS SEO data
- Semantic headings, labels and form states
- Keyboard focus for invalid form submission
- GA4 page-view and conversion events when configured
- Lazy loading for content images
- Reduced-motion CSS support
- No invented proof points or client claims

## Security boundary

Public frontend requests never directly create or expose `lead` or `job-application` content types. Forms use the controlled Strapi form routes created in Phase 1.6. Public content is expected to be restricted to approved/published records through Strapi permissions.

## Runtime verification

This phase includes source-level validation. A real Strapi + PostgreSQL runtime, production mail provider, GA4 property, CDN and deployment environment must be verified in Phase 3.
