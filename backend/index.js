import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import config from "./config/config.js";
import router from './routes/routes.js';

dotenv.config();
const corsOptions = {
  origin: process.env.FE_URL // || 'http://localhost:8080',
}

const HOST = '0.0.0.0';
const PORT = 4000;

mongoose
.connect(`mongodb://${config.user}:${config.password}@${config.HOST}:${config.PORT}/${config.DB}?authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', router);
  

  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
});