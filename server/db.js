const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "users",
  host: "localhost",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
