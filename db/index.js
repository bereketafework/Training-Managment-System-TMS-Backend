const { drizzle } = require("drizzle-orm/node-postgres");
const { config } = require("dotenv");

config(); // Load environment variables

const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
