const bootstrapRoles = require('../config/roles/bootstrap');

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    if (process.env.ENABLE_RBAC_BOOTSTRAP !== 'true') {
      strapi.log.info('[RBAC] Bootstrap disabled. Set ENABLE_RBAC_BOOTSTRAP=true to create custom roles.');
      return;
    }

    await bootstrapRoles({ strapi });
  },

  destroy() {},
};
