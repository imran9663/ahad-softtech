/**
 * AHAD Softtech admin-role policy.
 *
 * This file is the source of truth for the intended least-privilege model.
 * Actual role permissions should be finalized in Strapi Admin after the
 * corresponding content-types exist. Missing content-types are intentionally
 * ignored by the bootstrap helper.
 */

const CRUD = ['find', 'findOne', 'create', 'update', 'delete', 'publish'];

const contentTypeActions = (uid, actions = CRUD) =>
  actions.map((action) => `api::${uid}.${uid}.${action}`);

module.exports = {
  roles: [
    {
      name: 'Content Manager',
      code: 'ahad-content-manager',
      description: 'Manages approved website content, media and SEO. No access to sensitive leads or candidate applications.',
      permissions: [
        ...contentTypeActions('page'),
        ...contentTypeActions('navigation'),
        ...contentTypeActions('site-setting', ['find', 'findOne', 'update']),
        ...contentTypeActions('service'),
        ...contentTypeActions('blog-post'),
        ...contentTypeActions('category'),
        ...contentTypeActions('author'),
        ...contentTypeActions('case-study'),
        ...contentTypeActions('faq'),
        ...contentTypeActions('testimonial'),
        ...contentTypeActions('client-logo'),
        ...contentTypeActions('redirect'),
      ],
    },
    {
      name: 'Sales / Lead Manager',
      code: 'ahad-sales-lead-manager',
      description: 'Manages website leads, pipeline status, notes and follow-ups.',
      permissions: contentTypeActions('lead'),
    },
    {
      name: 'Recruitment Manager',
      code: 'ahad-recruitment-manager',
      description: 'Manages job openings and candidate applications. No sales lead access.',
      permissions: [
        ...contentTypeActions('job-opening'),
        ...contentTypeActions('job-application', ['find', 'findOne', 'update']),
      ],
    },
    {
      name: 'Editor / Contributor',
      code: 'ahad-editor-contributor',
      description: 'Limited content authoring role. Publishing should be granted only where an approved workflow permits it.',
      permissions: [
        ...contentTypeActions('blog-post', ['find', 'findOne', 'create', 'update']),
        ...contentTypeActions('case-study', ['find', 'findOne', 'create', 'update']),
        ...contentTypeActions('faq', ['find', 'findOne', 'create', 'update']),
      ],
    },
  ],
};
