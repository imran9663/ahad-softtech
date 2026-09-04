const { roles } = require('./roles');

/**
 * Creates the named custom roles if they do not exist.
 *
 * Permission assignment is intentionally not automated here because Strapi's
 * admin permission records are version-sensitive and the project is still
 * introducing its content-types. The policy is kept in roles.js and can be
 * applied/reviewed in the Admin > Settings > Administration Panel > Roles UI.
 */
module.exports = async ({ strapi }) => {
  const roleService = strapi.service('admin::role');

  for (const definition of roles) {
    const existing = await strapi.db.query('admin::role').findOne({
      where: { code: definition.code },
    });

    if (!existing) {
      await roleService.create({
        name: definition.name,
        code: definition.code,
        description: definition.description,
      });
      strapi.log.info(`[RBAC] Created role: ${definition.name}`);
    }
  }
};
