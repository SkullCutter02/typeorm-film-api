module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL || "postgresql://skullcutter@localhost:5432/typeorm_film_db",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts", "entity/**/*.js"],
  migrations: ["src/migration/**/*.ts", "migration/**/*/.js"],
  subscribers: ["src/subscriber/**/*.ts", "subscriber/**/*/.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
