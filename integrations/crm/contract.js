export function buildCrmLeadPayload(lead) {
  return { externalId: lead.id, source: lead.source || 'website', name: lead.name, email: lead.email, phone: lead.phone || null, company: lead.company || null, interest: lead.interest || null };
}
