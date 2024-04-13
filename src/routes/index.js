const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../docs/swagger.json');
const user_router = require('./user-route');

router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.use('/api/v1/users', user_router);

module.exports = router;
