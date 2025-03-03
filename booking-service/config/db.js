const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure this exists in your .env
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL Connected (Booking Service)");
});

module.exports = pool;
