# Phase 1.2 — Database + Strapi Bootstrap

## Scope
Initial CMS foundation for Site Settings, Navigation, Generic Pages, reusable SEO and controlled page sections.

## Content types
- Site Settings (single type)
- Navigation Item (collection type, hierarchical)
- Page (collection type, draft/publish)

## Reusable components
- SEO
- CTA
- Image
- Hero
- Rich Text
- Feature Split
- Service Grid
- Statistics
- Process Steps
- FAQ Block / FAQ Item
- CTA Block

## API policy
Foundation read routes are explicitly public for the website. Private write/query APIs for leads, applications and other sensitive content are deferred to their respective phases.

## Phase boundary
The Service Grid stores service references as JSON during this foundation phase. It will be migrated to the structured Service relation when the Services content type is introduced.

## Runtime verification
Dependency installation and live database boot require package-registry/network access and a local PostgreSQL runtime. This phase adds the Strapi schemas/configuration; it does not claim a successful live boot without that verification.
