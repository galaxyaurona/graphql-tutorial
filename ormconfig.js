module.exports = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: +process.env['DB_PORT'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  logging: false,
  synchronize: false,
  entities: [
    'dist/entity/**/*.js',
  ],
  migrations: [
    'dist/typeorm/migration/*.js',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/typeorm/migration',
  },
};
