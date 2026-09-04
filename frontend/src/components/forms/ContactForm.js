import { submitContactForm } from '../../services/formsApi.js';
import { trackEvent } from '../../services/analytics.js';
import { validateRequired, validateEmail, validatePhone, validateConsent } from '../../utils/validation.js';
import { focusFirstInvalid, announce } from '../../utils/accessibility.js';
import { renderFormState } from '../ui/FormState.js';

export function renderContactForm() {
  return `<form class="lead-form" data-contact-form novalidate>
    <div class="form-grid"><label>First name<input name="firstName" required autocomplete="given-name"></label><label>Last name<input name="lastName" autocomplete="family-name"></label></div>
    <div class="form-grid"><label>Work email<input type="email" name="email" required autocomplete="email"></label><label>Phone<input name="phone" autocomplete="tel"></label></div>
    <label>Company<input name="company" autocomplete="organization"></label>
    <label>How can we help?<textarea name="message" rows="6" required></textarea></label>
    <input class="honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <label class="consent"><input type="checkbox" name="consentToContact" required> I agree to be contacted about my enquiry.</label>
    <div data-form-state></div><button class="button button-dark" type="submit">Send enquiry <span>↗</span></button>
  </form>`;
}
export function bindContactForm() {
  const form = document.querySelector('[data-contact-form]'); if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form); const data = Object.fromEntries(fd.entries());
    const errors = [validateRequired(data.firstName,'First name'), validateEmail(data.email), validatePhone(data.phone), validateRequired(data.message,'Message'), validateConsent(data.consentToContact)].filter(Boolean);
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    if (errors.length) { const first = form.querySelector('input,textarea'); first?.setAttribute('aria-invalid','true'); form.querySelector('[data-form-state]').innerHTML = renderFormState('error', errors[0]); focusFirstInvalid(form); return; }
    form.querySelector('[data-form-state]').innerHTML = renderFormState('loading');
    try { await submitContactForm(data); form.reset(); form.querySelector('[data-form-state]').innerHTML = renderFormState('success'); trackEvent('generate_lead',{lead_type:'contact'}); announce('Your enquiry has been sent.'); }
    catch (err) { form.querySelector('[data-form-state]').innerHTML = renderFormState('error', err.message || 'Unable to send your enquiry.'); }
  });
}
