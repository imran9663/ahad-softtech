export function buildMarketingContactPayload(contact) {
  if (!contact.marketingConsent) throw new Error('Marketing synchronization requires recorded marketing consent.');
  return { externalId: contact.id, email: contact.email, name: contact.name, source: contact.source || 'website' };
}
