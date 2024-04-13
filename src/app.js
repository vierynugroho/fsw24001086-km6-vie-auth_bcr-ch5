const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');
const session = require('express-session');
const flash = require('connect-flash');
const createHttpError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger.json');

//! config
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//! middleware
app.use(cors());
app.use(express.json());
app.use(logger(process.env.NODE_LOGGER));
app.use(
	session({
		secret: process.env.SECRET_COOKIE,
		saveUninitialized: true,
		resave: false,
	})
);
app.use(flash());

app.use(router);

//* Error Handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
});

app.use((req, res) => {
	const url = req.url;
	res.status(404).json({
		error: {
			status: false,
			url: url,
			message: 'Not Found!',
		},
	});
});

module.exports = app;
