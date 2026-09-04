import { submitCareerApplication } from '../../services/formsApi.js';
import { trackEvent } from '../../services/analytics.js';
import { validateRequired, validateEmail, validatePhone, validateConsent, validateResume } from '../../utils/validation.js';
import { renderFormState } from '../ui/FormState.js';

export function renderCareerForm(job = null) {
  return `<form class="lead-form" data-career-form novalidate>
    ${job?.id ? `<input type="hidden" name="jobOpening" value="${job.slug || job.id}">` : ''}
    <div class="form-grid"><label>First name<input name="firstName" required autocomplete="given-name"></label><label>Last name<input name="lastName" required autocomplete="family-name"></label></div>
    <div class="form-grid"><label>Email<input type="email" name="email" required autocomplete="email"></label><label>Phone<input name="phone" required autocomplete="tel"></label></div>
    <label>Location<input name="location" autocomplete="address-level2"></label>
    <div class="form-grid"><label>LinkedIn URL<input name="linkedinUrl" type="url"></label><label>Portfolio URL<input name="portfolioUrl" type="url"></label></div>
    <label>Cover letter<textarea name="coverLetter" rows="7"></textarea></label>
    <label>Resume<input name="resume" type="file" accept=".pdf,.doc,.docx" required></label>
    <label class="consent"><input type="checkbox" name="consentToProcess" required> I consent to processing my application for recruitment purposes.</label>
    <input class="honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div data-form-state></div><button class="button button-dark" type="submit">Submit application <span>↗</span></button>
  </form>`;
}
export function bindCareerForm() {
  const form=document.querySelector('[data-career-form]');if(!form)return;
  form.addEventListener('submit',async e=>{e.preventDefault();const fd=new FormData(form);const fields=Object.fromEntries(fd.entries());const file=fd.get('resume');const errors=[validateRequired(fields.firstName,'First name'),validateRequired(fields.lastName,'Last name'),validateEmail(fields.email),validatePhone(fields.phone),validateResume(file),validateConsent(fields.consentToProcess)].filter(Boolean);if(errors.length){form.querySelector('[data-form-state]').innerHTML=renderFormState('error',errors[0]);return;}form.querySelector('[data-form-state]').innerHTML=renderFormState('loading');try{delete fields.resume;await submitCareerApplication({fields,resume:file});form.reset();form.querySelector('[data-form-state]').innerHTML=renderFormState('success','Application submitted successfully.');trackEvent('career_application');}catch(err){form.querySelector('[data-form-state]').innerHTML=renderFormState('error',err.message);}});
}
