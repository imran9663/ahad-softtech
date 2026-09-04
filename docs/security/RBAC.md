# AHAD Softtech — RBAC Policy

## Purpose

Implement least-privilege access for the AHAD Softtech Strapi administration layer.

The approved architecture defines five operational roles:

- Super Admin
- Content Manager
- Sales / Lead Manager
- Recruitment Manager
- Editor / Contributor

Super Admin remains restricted to the technical administrator(s). Routine content work must not use Super Admin access.

## Permission boundaries

| Area | Super Admin | Content Manager | Sales / Lead Manager | Recruitment Manager | Editor / Contributor |
|---|---:|---:|---:|---:|---:|
| Pages | Full | Manage | No | No | No |
| Navigation | Full | Manage | No | No | No |
| Site Settings | Full | Limited | No | No | No |
| Services | Full | Manage | No | No | No |
| Blog / Categories / Authors | Full | Manage | No | No | Limited |
| Case Studies | Full | Manage | No | No | Limited |
| FAQs | Full | Manage | No | No | Limited |
| Testimonials / Client Logos | Full | Manage | No | No | No |
| Leads | Full | No* | Manage | No | No |
| Job Openings | Full | Optional | No | Manage | No |
| Job Applications | Full | No | No | Manage | No |
| SEO | Full | Manage | No | No | No |
| Admin Users / System | Full | No | No | No | No |

\* Any exceptional access must be explicitly authorized and documented; it is not part of the default Content Manager role.

## Sensitive-data rules

Lead and candidate data are business-sensitive. Resumes and candidate records must not be exposed through public APIs. Internal notes, lead ownership, candidate evaluation and similar fields must remain outside public frontend payloads.

## Publishing

Editor / Contributor is intentionally created without publish/delete permissions. A future editorial approval workflow can add publishing authority to a separate reviewer role without changing authoring access.

## Bootstrap behavior

`ENABLE_RBAC_BOOTSTRAP=true` creates missing custom roles during Strapi bootstrap. It does not automatically assign content-manager permissions. Permissions must be reviewed/applied in the Strapi Administration Panel after the corresponding content-types are available.

This avoids silently granting broad permissions while the CMS schema is still being built.
