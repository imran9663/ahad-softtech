# Phase 1.7 — Public API Permissions

## Public read surface

The public API is intentionally limited to read operations needed by the corporate website:

- Site Settings
- Navigation
- Pages
- Services
- Case Studies
- Client Logos
- Testimonials
- FAQs
- Blog Posts
- Categories
- Tags
- Authors
- Job Openings
- Redirects

For draft-and-publish types, the public API should expose published content only through normal Strapi publication behavior.

## Explicitly private

The public role must not have `find`, `findOne`, `create`, `update`, or `delete` access to:

- Leads
- Job Applications

Public submissions use the controlled `/api/forms/contact`, `/api/forms/request-quote`, and `/api/forms/career` endpoints instead of direct content-type writes.

## Bootstrap

Set `ENABLE_PUBLIC_API_PERMISSION_BOOTSTRAP=true` for a controlled, idempotent permission bootstrap. Review the resulting permissions in Strapi Admin before production deployment.

The bootstrap intentionally fails closed for sensitive lead/application actions by disabling any existing public permissions for those actions.

## Production checklist

- Verify every public action in Strapi Admin.
- Confirm sensitive content types are not publicly readable.
- Confirm form endpoints are rate-limited and protected from spam.
- Keep admin API tokens out of frontend code.
- Use HTTPS and production secrets.
- Re-test anonymous requests against the public API after every schema or route change.
