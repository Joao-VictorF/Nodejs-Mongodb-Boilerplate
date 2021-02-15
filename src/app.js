// Setup
require('module-alias/register')
require('dotenv').config();
const express    = require('express');
const app        = express();

// Server
const bodyParser = require('body-parser');
const cors       = require('cors');

// Loggers
const morgan     = require('morgan');
const logger     = require('@common/winston');

// Routing and connections
const router     = require('@routes/routes');
const mongoose   = require('mongoose');

// ----------------------------- DATABASE CONNECTION --------------------------
const uri = process.env.NODE_ENV === 'development'
  ? process.env.DB_DEV_URI
  : process.env.DB_PRODUCTION_URI;

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
});

// --------------------------- LOGGING -----------------------------

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
