const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function body(ctx) {
  return ctx.request.body || {};
}

function assertString(ctx, value, field, max = 500) {
  if (typeof value !== 'string' || !value.trim()) ctx.throw(400, `${field} is required`);
  if (value.length > max) ctx.throw(400, `${field} is too long`);
  return value.trim();
}

function assertEmail(ctx, value) {
  const email = assertString(ctx, value, 'email', 254);
  if (!EMAIL_RE.test(email)) ctx.throw(400, 'A valid email is required');
  return email;
}

function honeypotCheck(ctx) {
  if (body(ctx).website || body(ctx).url) ctx.throw(400, 'Invalid submission');
}

async function createLead(ctx, leadType) {
  honeypotCheck(ctx);
  const input = body(ctx);
  const data = {
    leadType,
    firstName: assertString(ctx, input.firstName, 'firstName', 100),
    lastName: input.lastName ? String(input.lastName).trim().slice(0, 100) : undefined,
    company: input.company ? String(input.company).trim().slice(0, 200) : undefined,
    jobTitle: input.jobTitle ? String(input.jobTitle).trim().slice(0, 150) : undefined,
    email: assertEmail(ctx, input.email),
    phone: input.phone ? String(input.phone).trim().slice(0, 50) : undefined,
    country: input.country ? String(input.country).trim().slice(0, 100) : undefined,
    serviceInterest: input.serviceInterest ? String(input.serviceInterest).trim().slice(0, 150) : undefined,
    budgetRange: input.budgetRange ? String(input.budgetRange).trim().slice(0, 100) : undefined,
    message: input.message ? String(input.message).trim().slice(0, 5000) : undefined,
    source: input.source ? String(input.source).trim().slice(0, 100) : 'website',
    consentToContact: input.consentToContact === true || input.consentToContact === 'true'
  };
  if (!data.consentToContact) ctx.throw(400, 'Consent to contact is required');

  const lead = await strapi.documents('api::lead.lead').create({ data });
  return { data: { id: lead.documentId || lead.id, message: 'Thanks. Your enquiry has been received.' } };
}

module.exports = ({ strapi }) => ({
  async contact(ctx) {
    ctx.body = await createLead(ctx, 'contact');
  },

  async requestQuote(ctx) {
    ctx.body = await createLead(ctx, 'request_quote');
  },

  async career(ctx) {
    const input = body(ctx);
    const files = ctx.request.files || {};
    const resume = files.resume;
    if (!resume) ctx.throw(400, 'Resume is required');
    if (resume.size > MAX_RESUME_BYTES) ctx.throw(400, 'Resume must be 5 MB or smaller');

    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (resume.type && !allowed.includes(resume.type)) ctx.throw(400, 'Resume must be PDF or Word document');

    const firstName = assertString(ctx, input.firstName, 'firstName', 100);
    const lastName = assertString(ctx, input.lastName, 'lastName', 100);
    const email = assertEmail(ctx, input.email);
    const phone = assertString(ctx, input.phone, 'phone', 50);
    const consentToProcess = input.consentToProcess === true || input.consentToProcess === 'true';
    if (!consentToProcess) ctx.throw(400, 'Consent to process application data is required');

    let jobOpening;
    if (input.jobOpening) {
      const jobs = await strapi.documents('api::job-opening.job-opening').findMany({
        filters: { slug: { $eq: String(input.jobOpening) }, active: { $eq: true } },
        fields: ['id', 'documentId'],
        limit: 1
      });
      if (!jobs.length) ctx.throw(400, 'Selected job opening was not found');
      jobOpening = jobs[0].documentId || jobs[0].id;
    }

    const uploaded = await strapi.plugin('upload').service('upload').upload({
      data: {},
      files: resume
    });
    const resumeId = uploaded?.[0]?.id;
    if (!resumeId) ctx.throw(500, 'Resume upload failed');

    const data = {
      firstName,
      lastName,
      email,
      phone,
      location: input.location ? String(input.location).trim().slice(0, 150) : undefined,
      coverLetter: input.coverLetter ? String(input.coverLetter).trim().slice(0, 5000) : undefined,
      linkedinUrl: input.linkedinUrl ? String(input.linkedinUrl).trim().slice(0, 500) : undefined,
      portfolioUrl: input.portfolioUrl ? String(input.portfolioUrl).trim().slice(0, 500) : undefined,
      resume: resumeId,
      jobOpening,
      consentToProcess,
      source: input.source ? String(input.source).trim().slice(0, 100) : 'website'
    };

    const application = await strapi.documents('api::job-application.job-application').create({ data });
    ctx.body = { data: { id: application.documentId || application.id, message: 'Your application has been submitted.' } };
  }
});
