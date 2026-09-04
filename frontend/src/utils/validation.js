export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^[+()\d\s.-]{7,24}$/;

export function validateRequired(value, label) {
  return String(value ?? '').trim() ? '' : `${label} is required.`;
}
export function validateEmail(value) {
  return emailPattern.test(String(value || '').trim()) ? '' : 'Enter a valid email address.';
}
export function validatePhone(value) {
  return !value || phonePattern.test(String(value).trim()) ? '' : 'Enter a valid phone number.';
}
export function validateConsent(value) {
  return value ? '' : 'Consent is required to submit this form.';
}
export function validateResume(file) {
  if (!file) return '';
  const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type)) return 'Resume must be a PDF, DOC or DOCX file.';
  if (file.size > 5 * 1024 * 1024) return 'Resume must be 5 MB or smaller.';
  return '';
}
