// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const rateLimit = require('express-rate-limit');
global.rootdir = __dirname

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

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
    console.log(`An error occurred: ${err.message}`)
    process.exit(1)
})