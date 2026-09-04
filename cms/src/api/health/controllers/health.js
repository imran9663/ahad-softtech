module.exports = ({ strapi }) => ({
  async index(ctx) {
    const started = Date.now();
    let database = 'ok';
    try {
      await strapi.db.connection.raw('select 1');
    } catch (error) {
      database = 'error';
      ctx.status = 503;
    }
    ctx.body = {
      status: database === 'ok' ? 'ok' : 'degraded',
      service: 'ahad-softtech-cms',
      database,
      uptimeSeconds: Math.round(process.uptime()),
      responseMs: Date.now() - started,
      timestamp: new Date().toISOString()
    };
  }
});
