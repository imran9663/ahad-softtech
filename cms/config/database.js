module.exports = ({ env }) => {
  const databaseUrl = env('DATABASE_URL', '');
  const sslEnabled = env.bool('DATABASE_SSL', true);
  const sslRejectUnauthorized = env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false);
  const sslCa = env('DATABASE_SSL_CA', '');

  const ssl = sslEnabled
    ? {
        rejectUnauthorized: sslCa ? true : sslRejectUnauthorized,
        ...(sslCa ? { ca: sslCa } : {})
      }
    : false;

  const connection = databaseUrl
    ? {
        connectionString: databaseUrl,
        ssl
      }
    : {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'ahad_softtech'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'change-me'),
        ssl,
        schema: env('DATABASE_SCHEMA', 'public')
      };

  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
        acquireTimeoutMillis: env.int('DATABASE_POOL_ACQUIRE_TIMEOUT', 60000),
        createTimeoutMillis: env.int('DATABASE_POOL_CREATE_TIMEOUT', 60000),
        idleTimeoutMillis: env.int('DATABASE_POOL_IDLE_TIMEOUT', 30000)
      }
    }
  };
};
