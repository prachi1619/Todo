import { config } from "dotenv";

config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";

export const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SECRET_KEY,
  LOG_DIR,
  SERVER_PORT
} = process.env;