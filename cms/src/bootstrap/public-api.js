const PUBLIC_READ_ACTIONS = [
  'api::site-settings.site-settings.find',
  'api::navigation.navigation.find',
  'api::page.page.find',
  'api::page.page.findOne',
  'api::service.service.find',
  'api::service.service.findOne',
  'api::case-study.case-study.find',
  'api::case-study.case-study.findOne',
  'api::client-logo.client-logo.find',
  'api::client-logo.client-logo.findOne',
  'api::testimonial.testimonial.find',
  'api::testimonial.testimonial.findOne',
  'api::faq.faq.find',
  'api::faq.faq.findOne',
  'api::blog-post.blog-post.find',
  'api::blog-post.blog-post.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::tag.tag.find',
  'api::tag.tag.findOne',
  'api::author.author.find',
  'api::author.author.findOne',
  'api::job-opening.job-opening.find',
  'api::job-opening.job-opening.findOne',
  'api::redirect.redirect.find',
  'api::redirect.redirect.findOne'
];

async function configurePublicApiPermissions(strapi) {
  const roleQuery = strapi.db.query('plugin::users-permissions.role');
  const permissionQuery = strapi.db.query('plugin::users-permissions.permission');

  const publicRole = await roleQuery.findOne({ where: { type: 'public' } });
  if (!publicRole) {
    strapi.log.warn('Public API permission bootstrap skipped: public role not found.');
    return;
  }

  for (const action of PUBLIC_READ_ACTIONS) {
    const existing = await permissionQuery.findOne({
      where: { action, role: publicRole.id }
    });

    if (!existing) {
      await permissionQuery.create({
        data: {
          action,
          role: publicRole.id,
          enabled: true
        }
      });
    } else if (existing.enabled !== true) {
      await permissionQuery.update({
        where: { id: existing.id },
        data: { enabled: true }
      });
    }
  }

  // Explicitly keep sensitive write/read actions disabled for the public role.
  const sensitiveActions = [
    'api::lead.lead.find',
    'api::lead.lead.findOne',
    'api::lead.lead.create',
    'api::lead.lead.update',
    'api::lead.lead.delete',
    'api::job-application.job-application.find',
    'api::job-application.job-application.findOne',
    'api::job-application.job-application.create',
    'api::job-application.job-application.update',
    'api::job-application.job-application.delete'
  ];

  for (const action of sensitiveActions) {
    const existing = await permissionQuery.findOne({
      where: { action, role: publicRole.id }
    });
    if (existing?.enabled) {
      await permissionQuery.update({
        where: { id: existing.id },
        data: { enabled: false }
      });
    }
  }

  strapi.log.info(`Public API permissions configured for ${PUBLIC_READ_ACTIONS.length} read actions.`);
}

module.exports = { configurePublicApiPermissions, PUBLIC_READ_ACTIONS };
