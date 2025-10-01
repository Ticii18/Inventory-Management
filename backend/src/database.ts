import { Pool } from "pg";
import { env } from "process";
import dotenv from "dotenv";

dotenv.config();


const pool = new Pool({
  user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT ? parseInt(env.DB_PORT as string, 10) : 5432,
    
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};