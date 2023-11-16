// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

const { limiter } = require('./app/utils');
global.rootdir = __dirname;

// apply middlewares for express
app.use(limiter);
app.use(cors());
app.use(morgan('dev'));

// Cookies and Parsers
app.use(cookieParser());
app.use("/public",express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.set('trust proxy', false)

require('./app')(app);

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`);
    process.exit(1);
})