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
    "./db/guestAssignSchema.js",
    "./db/categorySchema.js",
    "./db/resourceSchema.js",
    "./db/teamSchema.js",
    "./db/userAssignmentSchema.js",
    "./db/resourceAllocationSchema.js",
    "./db/attendanceSchema.js",
    "./db/enrollmentSchema.js",
    "./db/sponsorSchema.js",
    "./db/paymentMethodSchema.js",
    "./db/paymentSchema.js",
    "./db/sponsorshipSchema.js",
    "./db/userRolesSchema.js",
    "./db/certificateSchema.js",
    "./db/allwoanceSchema.js",
    "./db/teamRoleSchema.js",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
