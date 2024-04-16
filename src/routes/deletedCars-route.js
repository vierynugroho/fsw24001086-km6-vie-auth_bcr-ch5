//TODO: Car Route
const express = require('express');

const router = express.Router();

const CheckRole = require('../middlewares/role-middleware');
const { AuthsMiddleware } = require('../middlewares/auth-middleware');
const { DeletedCarsControllers } = require('../controllers/deletedCars');

router.get('/', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), DeletedCarsControllers.getAll);

module.exports = router;
