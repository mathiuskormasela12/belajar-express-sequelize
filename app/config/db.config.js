const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  pool: {
    min: Number(process.env.DB_MIN),
    max: Number(process.env.DB_MAX),
    acquire: Number(process.env.DB_ACQUIRE),
    idle: Number(process.env.DB_IDLE)
  }
}