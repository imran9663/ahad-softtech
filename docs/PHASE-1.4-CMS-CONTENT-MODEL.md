# Phase 1.4 — Database & CMS Content Model Foundation

## Objective
Establish the database-backed Strapi content model foundation for the corporate website before implementing the broader service, case-study, blog, careers, lead, and application models.

## Implemented models

### 1. Site Settings (single type)
Global website configuration:
- site identity and tagline
- logo and favicon
- default SEO
- primary contact details
- address
- social links
- analytics configuration placeholder

### 2. Navigation (collection type)
Hierarchical navigation entries with:
- header/footer/utility location
- label + UID slug
- URL
- ordering
- visibility
- parent/children relationship
- external/new-tab flag

### 3. Page (collection type)
Structured pages with:
- title + UID slug
- page type
- excerpt
- controlled dynamic-zone sections
- page-level SEO
- sitemap visibility
- ordering
- draft/publish workflow

### 4. SEO component
Reusable metadata block containing:
- meta title/description
- keywords
- canonical URL
- robots controls
- Open Graph title/description/image
- Twitter card type

### 5. Reusable section components
- Hero
- Rich Text
- Feature Split
- Service Grid
- Statistics
- Process Steps
- FAQ Block / FAQ Item
- CTA Block
- Shared CTA
- Shared Image

### 6. Service (collection type)
The service model is included as the first domain content type after the foundation, supporting:
- name + UID slug
- short and long descriptions
- icon / hero media
- structured feature and process payloads
- SEO
- featured flag
- ordering

## Design decisions

1. **Controlled page composition:** Pages use a finite dynamic zone rather than an unrestricted page builder. This protects visual consistency and makes frontend rendering predictable.
2. **SEO is reusable:** SEO is a component so Pages, Services, and future content types can share the same metadata contract.
3. **Navigation is hierarchical:** Parent/child relations support dropdowns and nested footer structures without hard-coding the menu in frontend code.
4. **Service Grid remains temporarily JSON-backed:** The Page section can be rendered without a hard dependency on the full service relationship API. Once Services are fully implemented, this can be upgraded to a relation if the frontend/content workflow benefits from it.
5. **Sensitive operational data is excluded:** Leads, job applications, HR operations, payroll, ITSM, and internal BPO operations are not part of this website CMS foundation.

## Database expectation
The schemas are designed for the PostgreSQL-backed Strapi environment defined in Phase 1.1/1.2. Strapi generates and manages the physical database tables/relations from these schemas during application startup.

## Validation completed
- JSON schema files generated and parsed successfully.
- Project directory structure checked.
- Runtime installation/database migration was not claimed because Strapi dependencies are not currently installed/booted in this environment.

## Next
Phase 1.5 should complete the remaining website content models: Case Studies, Testimonials, Client Logos, FAQs, Blog/Categories/Authors, Careers/Jobs/Applications, Redirects, and Leads, followed by permissions review in Strapi Admin.
