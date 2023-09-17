import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import config from "./config/config.js";
import router from './routes/routes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load env variables
dotenv.config();

// Defining constants for the application
const corsOptions = {
  origin: process.env.FE_URL, // || 'http://localhost:8080',
  allowedMethods: ['GET', 'POST'],
}
const HOST = '0.0.0.0';
const PORT = 4000;

// Establish Connection to MongoDB via Mongoose ORM (Key dependency for the API server).
mongoose
.connect(`mongodb://${config.user}:${config.password}@${config.HOST}:${config.PORT}/${config.DB}?authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// Only proceed to start the server if the connection to the database is successful
.then(() => {
  // Intialize express app
  const app = express();

  // Adding Middlewares
  app.use(cors(corsOptions)); //Enable CORS for the FE application
  app.use(express.json()); //Enable parsing of JSON request body
  app.use(express.urlencoded({ extended: true })); //Enable parsing of x-www-form-urlencoded requests

  app.use('/api', router); // Mount the router at /api so that all routes start with /api
  app.use(errorHandler); // Mount the error handler middleware after routes are mounted

  // Start the server
  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
})
// If there is an error in connecting to the database, log the error message and exit the process.
.catch((error) => {
  console.log(error.message);
  process.exit();
});