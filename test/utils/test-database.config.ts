import { DataSourceOptions } from 'typeorm';

export const getTestDatabaseConfig = (): DataSourceOptions => {
  return {
    type: (process.env.DATABASE_TYPE as any) || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'secret',
    database: process.env.TEST_DATABASE_NAME || 'test_api',
    synchronize: true, // Enable synchronize for tests
    dropSchema: false,
    logging: false, // Disable logging for tests
    entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../src/database/migrations/**/*{.ts,.js}'],
    extra: {
      max: process.env.DATABASE_MAX_CONNECTIONS
        ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
        : 100,
      ssl:
        process.env.DATABASE_SSL_ENABLED === 'true'
          ? {
              rejectUnauthorized:
                process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
              ca: process.env.DATABASE_CA ?? undefined,
              key: process.env.DATABASE_KEY ?? undefined,
              cert: process.env.DATABASE_CERT ?? undefined,
            }
          : undefined,
    },
  };
};
