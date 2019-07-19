module.exports = {
  type: 'postgres',
  host: process.env['DB_HOST'] || 'db',
  port: +process.env['DB_PORT'] || 5432,
  username: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASSWORD'] || 'example',
  database: process.env['DB_NAME'] || 'postgres',
  logging: false,
  synchronize: false,
  entities: [
    "dist/entity/**/*.js"
  ],
  migrations: [
    "dist/typeorm/migration/*.js"
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/typeorm/migration"
  },
};
