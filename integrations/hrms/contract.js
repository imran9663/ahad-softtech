export function buildHrmsApplicationPayload(application) {
  return { externalId: application.id, jobSlug: application.jobSlug, name: application.name, email: application.email, phone: application.phone || null, resumeReference: application.resumeReference || null };
}
