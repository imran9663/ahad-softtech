# Phase 1.5 — Complete Remaining CMS Content Models

## Objective
Complete the website-domain content models required by the AHAD Softtech corporate CMS, while keeping sensitive lead and candidate data separate from public website content.

## Implemented content types

### Content
- **Case Study** — challenge, solution, implementation, results, metrics, technologies, service relationships, client visibility, testimonial, media and SEO.
- **Testimonial** — quote, person/company attribution, media, rating, approval and display controls.
- **Client Logo** — client identity, logo, website, approval and display controls.
- **FAQ** — reusable question/answer entries with approval and ordering.
- **Author** — editorial author profile, biography, photo and social links.
- **Category** — blog taxonomy with SEO and active state.
- **Tag** — lightweight blog taxonomy used by posts.
- **Blog Post** — editorial content, author/category/tag relationships, reading time, publication date, featured media and SEO.

### Careers
- **Job Opening** — role, department, location, employment type, work mode, description, requirements, benefits, deadline and SEO.
- **Job Application** — candidate details, resume, job relationship, application status, consent and internal notes.

### Leads
- **Lead** — contact/request-quote enquiries, company/contact details, service interest, qualification status, follow-up and internal notes.

### SEO/system
- **Redirect** — source path, destination path, HTTP redirect code, active state and operational note.

## Reusable components added

- `case-study.metric`
- `case-study.technology`
- `career.social-link`
- `lead.lead-note`

## Relationship model

```text
Author ───────< Blog Post >─────── Category
                    |
                    └─────────────< Tag

Service >──────────< Case Study >────────── Testimonial
                         |
                         └──────── Client Logo

Job Opening ───────< Job Application
```

## Security decisions

1. **Leads and Job Applications use draft/publish = false.** These are operational records, not editorial website content.
2. Sensitive records must not be granted to the public API. Public permissions should only expose the minimum read operations required by the frontend.
3. Sales/Lead Manager should receive Lead access; Recruitment Manager should receive Job Opening/Application access. These domains should remain separated by role.
4. Candidate resumes are stored as file media and must be protected by CMS/admin permissions and appropriate storage access controls.
5. Testimonials and client logos include approval fields so unverified social proof is not accidentally published.
6. Case studies support `public_name`, `anonymized`, and `confidential` client visibility to prevent accidental disclosure of confidential client identities.
7. No fabricated metrics, client logos, testimonials, awards or certifications should be entered.

## Scope boundary

This phase completes the **website CMS domain**. It does not implement HRMS, payroll, attendance, ITSM, employee onboarding, BPO operations, CRM pipelines beyond website leads, or other internal business systems.

## Validation

All Strapi JSON schema/component files in the project were parsed successfully after the Phase 1.5 changes. Runtime Strapi startup and PostgreSQL migration were not claimed because dependencies/database services are not installed or booted in this environment.

## Next

Phase 1.6 should focus on CMS API integration and frontend consumption: populate/REST query strategy, public vs authenticated permissions, serializers, media handling, service/case-study/blog/careers rendering, lead submission endpoints, and SEO/sitemap data consumption.
