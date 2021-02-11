// Server
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
require('module-alias/register')

// Loggers
const morgan     = require('morgan');

// Routing and connections
const router     = require('@routes/routes');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// ----------------------------- DATABASE CONNECTION --------------------------
const uri = process.env.DB_DEV_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', async () => {
  console.log('[ DB connection successfully initialized ]');
});

db.on('error', err => {
  let errMsg = `[ An error occurred while attempting to connect to DB: ] \n${err}`
  logger.log({
    level: 'error',
    message: errMsg
  });
  console.log(errMsg);
});

// --------------------------- LOGGING -----------------------------

const logger     = require('@common/winston');
app.use(morgan('dev')); // HTTP requests in development

// ----------------------------- APP -------------------------------
app.use(cors({origin: "*"}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Load routes
app.use(router);

// Route not found
app.use((req, res) => {
  logger.log({
    level: 'info',
    message: `The route ${req.url} was not found.`
  });

  return res.status(404).json({
    message: "Route not found."
  })
});

module.exports = app;
