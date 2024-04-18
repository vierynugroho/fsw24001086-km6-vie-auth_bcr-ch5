//TODO: Car Route
const express = require('express');

const router = express.Router();

const upload = require('../middlewares/upload-middleware');
const validatorMiddleware = require('../middlewares/validator-middleware');
const CheckRole = require('../middlewares/role-middleware');
const { AuthsMiddleware } = require('../middlewares/auth-middleware');
const { CarControllers } = require('../controllers/cars');
const { carSchema, carUpdateSchema } = require('../utils/joiValidation');

router.get('/', CarControllers.getAll);
router.get('/:id', CarControllers.find);
router.post('/', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), upload.array('images'), validatorMiddleware(carSchema), CarControllers.create);
router.patch('/:id', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), upload.array('images'), validatorMiddleware(carUpdateSchema), CarControllers.update);
router.delete('/:id', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), CarControllers.delete);

module.exports = router;
