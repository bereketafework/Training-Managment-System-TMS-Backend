const { defineConfig } = require("drizzle-kit");
const { pg } = require("drizzle-orm/pg-core");
const { config } = require("dotenv");
config();

module.exports = defineConfig({
  migrationsFolder: "./db",
  driver: pg,
  out: "./drizzle",
  schema: [
    "./db/userSchema.js",
    "./db/courseSchema.js",
    "./db/trainingSchema.js",
    "./db/ParticipantSchema.js",
    "./db/sessionSchema.js",
    "./db/guestSchema.js",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
