import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
};
