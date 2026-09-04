const { configurePublicApiPermissions } = require('./bootstrap/public-api');
const { seedCmsFoundation } = require('./bootstrap/seed');

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    if (process.env.ENABLE_PUBLIC_API_PERMISSION_BOOTSTRAP === 'true') {
      await configurePublicApiPermissions(strapi);
    }

    if (process.env.ENABLE_CMS_SEED === 'true') {
      await seedCmsFoundation(strapi);
    }
  }
};
