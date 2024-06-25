import { getEnv } from "../utils/env";

export default {
    DB_HOST: getEnv('DB_HOST'),
    DB_PORT: parseInt(getEnv('DB_PORT'), 10),
    DB_USER: getEnv('DB_USER'),
    DB_PASSWORD: getEnv('DB_PASSWORD'),
    DB_NAME: getEnv('DB_NAME'),
    APP_PORT: parseInt(getEnv('PORT'), 10),
    QDRANT_HOST: getEnv('QDRANT_HOST'),
}