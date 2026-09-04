# Phase 4 — Business Integrations Foundation

Phase 4 establishes provider-neutral integration contracts for optional business systems. No external provider is assumed or activated without a confirmed business requirement and credentials.

## Integration domains

1. CRM integration — outbound lead synchronization and status callbacks.
2. HRMS integration — job/application synchronization without exposing sensitive candidate data unnecessarily.
3. WhatsApp API — consent-aware lead/career notifications.
4. Marketing automation — consent-gated contact/event synchronization.
5. Advanced lead scoring — deterministic scoring hooks and explainable score factors.
6. Multi-language content — locale-aware content contract and routing foundation.
7. Advanced analytics dashboards — event taxonomy and reporting contract.
8. Content approval workflow — editorial states, scheduled publishing and live-preview contract.

## Principles

- Provider-neutral adapters; credentials live only in environment variables/secrets.
- Website CMS remains the system of record for website content.
- Sensitive lead/candidate data is never sent to third parties by default.
- Consent and purpose must be recorded before marketing/WhatsApp synchronization.
- Integrations fail gracefully and must not block primary website submissions.
- Every external integration must have timeout, retry/backoff, logging and idempotency expectations.

## Activation

Each adapter is disabled by default. Enable only after the provider, data mapping, legal basis/consent, retention policy and failure behavior have been approved.
