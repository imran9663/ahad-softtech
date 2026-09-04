import { cmsFetch } from './cmsApi.js';

function clean(data) {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined && value !== null && value !== ''));
}

export async function submitContactForm(data) {
  return cmsFetch('/api/forms/contact', { method: 'POST', body: JSON.stringify(clean(data)) });
}

export async function submitQuoteForm(data) {
  return cmsFetch('/api/forms/request-quote', { method: 'POST', body: JSON.stringify(clean(data)) });
}

export async function submitCareerApplication({ fields, resume }) {
  const form = new FormData();
  Object.entries(clean(fields)).forEach(([key, value]) => form.append(key, String(value)));
  if (resume) form.append('resume', resume);
  return cmsFetch('/api/forms/career', { method: 'POST', body: form });
}
