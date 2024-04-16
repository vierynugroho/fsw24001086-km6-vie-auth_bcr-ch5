require('dotenv/config');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../docs/swagger.json');
const auth_router = require('./auth-route');
const car_router = require('./car-route');
const deletedCar_router = require('./deletedCars-route');

router.get('/api/v1', (req, res, next) => {
	res.status(200).json({
		status: true,
		message: 'Welcome to API Akuuh',
		docs: {
			postman: 'https://documenter.getpostman.com/view/22814931/2sA3Bj9ZxZ',
			swagger: `http://localhost:${process.env.PORT}/api/v1/docs`,
		},
	});
});

router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.use('/api/v1', auth_router);
router.use('/api/v1/cars', car_router);
router.use('/api/v1/deleted-cars', deletedCar_router);

module.exports = router;
