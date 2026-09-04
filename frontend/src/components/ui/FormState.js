export function renderFormState(type = 'idle', message = '') {
  if (type === 'loading') return `<p class="form-state" role="status">${message || 'Submitting…'}</p>`;
  if (type === 'success') return `<p class="form-state form-success" role="status">${message || 'Thanks. Your submission has been received.'}</p>`;
  if (type === 'error') return `<p class="form-state form-error" role="alert">${message || 'Something went wrong. Please try again.'}</p>`;
  return '';
}
