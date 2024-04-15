const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../docs/swagger.json');
const auth_router = require('./auth-route');
const car_router = require('./car-route');

router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.use('/api/v1', auth_router);
router.use('/api/v1/cars', car_router);

module.exports = router;
