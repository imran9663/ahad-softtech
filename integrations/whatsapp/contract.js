export function buildWhatsAppMessage({ phone, template, variables = {}, consent }) {
  if (!consent) throw new Error('WhatsApp messaging requires recorded consent.');
  return { phone, template, variables };
}
