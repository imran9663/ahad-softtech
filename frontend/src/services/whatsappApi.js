export function getWhatsAppUrl(phone, message = '') {
  const digits = String(phone || '').replace(/[^0-9]/g, '');
  if (!digits) return '';
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}
