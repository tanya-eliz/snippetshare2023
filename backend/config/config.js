import dotenv from 'dotenv';

dotenv.config();

const config = {
  HOST: process.env.DB_HOST, // || 'localhost',
  PORT: process.env.DB_PORT, // || 27017,
  DB: process.env.MONGODB_DATABASE, // || 'anonymous_bin_db',
  user: process.env.MONGODB_USER, // || 'tanyaeliz',
  password: process.env.MONGODB_PASSWORD, // || 123456,
}

export default config;