import { submitQuoteForm } from '../../services/formsApi.js';
import { trackEvent } from '../../services/analytics.js';
import { validateRequired, validateEmail, validatePhone, validateConsent } from '../../utils/validation.js';
import { renderFormState } from '../ui/FormState.js';

export function renderQuoteForm() {
  return `<form class="lead-form" data-quote-form novalidate>
    <div class="form-grid"><label>First name<input name="firstName" required autocomplete="given-name"></label><label>Last name<input name="lastName" autocomplete="family-name"></label></div>
    <div class="form-grid"><label>Work email<input type="email" name="email" required autocomplete="email"></label><label>Phone<input name="phone" autocomplete="tel"></label></div>
    <div class="form-grid"><label>Company<input name="company" required autocomplete="organization"></label><label>Country<input name="country" autocomplete="country-name"></label></div>
    <label>Service interest<select name="serviceInterest"><option value="">Select a capability</option><option>BPO Services</option><option>Customer Support</option><option>Technical Support</option><option>Back-office Operations</option><option>Data & Operations</option><option>Software Development</option><option>Digital Solutions</option></select></label>
    <label>Budget range<input name="budgetRange"></label>
    <label>Requirement<textarea name="message" rows="7" required></textarea></label>
    <input class="honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <label class="consent"><input type="checkbox" name="consentToContact" required> I agree to be contacted about my enquiry.</label>
    <div data-form-state></div><button class="button button-dark" type="submit">Request a quote <span>↗</span></button>
  </form>`;
}
export function bindQuoteForm() {
  const form = document.querySelector('[data-quote-form]'); if (!form) return;
  form.addEventListener('submit', async e => { e.preventDefault(); const data=Object.fromEntries(new FormData(form).entries());
    const errors=[validateRequired(data.firstName,'First name'),validateEmail(data.email),validatePhone(data.phone),validateRequired(data.company,'Company'),validateRequired(data.message,'Requirement'),validateConsent(data.consentToContact)].filter(Boolean);
    if(errors.length){form.querySelector('[data-form-state]').innerHTML=renderFormState('error',errors[0]);return;}
    form.querySelector('[data-form-state]').innerHTML=renderFormState('loading');
    try{await submitQuoteForm(data);form.reset();form.querySelector('[data-form-state]').innerHTML=renderFormState('success','Thanks. We will review your requirement and get back to you.');trackEvent('generate_lead',{lead_type:'request_quote'});}
    catch(err){form.querySelector('[data-form-state]').innerHTML=renderFormState('error',err.message);}
  });
}
