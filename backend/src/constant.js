const dotenv = require('dotenv');
dotenv.config();

const getEnv = (key) => {
  if (process.env[key]) {
    return process.env[key];
  } else {
    throw new Error(`The ${key} environment variable is required`);
  }
};

const NODE_PORT = getEnv('BACKEND_PORT');
const DB_HOST = getEnv('DB_HOST');
const DB_PORT = getEnv('DB_PORT');
const DB_USER = getEnv('DB_USER');
const DB_PASSWORD = getEnv('DB_PASSWORD');
const DB_NAME = getEnv('DB_NAME');
const JWT_SECRET = getEnv('JWT_SECRET');
const JWT_EXPIRE = getEnv('JWT_EXPIRE');
const BACKEND_BASE_URL = getEnv('BACKEND_BASE_URL');
const UPLOADS_BASE_DIR = getEnv('UPLOADS_BASE_DIR');

module.exports = {
  NODE_PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRE,
  BACKEND_BASE_URL,
  UPLOADS_BASE_DIR
};