const dotenv = require('dotenv');
dotenv.config();

const getEnv = (key) => {
  if (process.env[key]) {
    return process.env[key];
  } else {
    throw new Error(`The ${key} environment variable is required`);
  }
};

const PORT = getEnv('PORT');
const DB_HOST = getEnv('DB_HOST');
const DB_PORT = getEnv('DB_PORT');
const DB_USER = getEnv('DB_USER');
const DB_PASSWORD = getEnv('DB_PASSWORD');
const DB_NAME = getEnv('DB_NAME');

module.exports = {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
};