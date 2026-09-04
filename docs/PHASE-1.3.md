# Phase 1.3 — Strapi Admin, Roles & Permissions

## Objective

Establish the least-privilege administrative model defined by the AHAD Softtech CMS architecture.

## Deliverables

- Role policy source of truth in `cms/config/roles/roles.js`.
- Optional bootstrap for creating custom roles.
- RBAC documentation and permission matrix.
- Admin security checklist.
- Separation of sales and recruitment access.
- Restricted contributor publishing rights.

## Runtime activation

Set `ENABLE_RBAC_BOOTSTRAP=true` only when bootstrapping the CMS in a controlled environment. Review the created roles in the Strapi Admin UI before assigning users or production permissions.

## Important limitation

The project does not yet contain every final content-type. Therefore permission records are not blindly generated for future models. As each model is implemented, its role permissions must be reviewed against `docs/security/RBAC.md`.

## Completion gate

- [x] Role definitions documented.
- [x] Least-privilege boundaries defined.
- [x] Role bootstrap scaffold added.
- [x] Sensitive-data separation documented.
- [x] Contributor publish restrictions defined.
- [ ] Strapi runtime boot verified.
- [ ] Roles verified in Admin UI.
- [ ] Permissions verified against final content-types.
- [ ] MFA verified in deployed environment.
