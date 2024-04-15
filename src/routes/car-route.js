//TODO: Car Route
const express = require('express');

const router = express.Router();

const upload = require('../middlewares/upload-middleware');
const validatorMiddleware = require('../middlewares/validator-middleware');
const CheckRole = require('../middlewares/role-middleware');
const { AuthsMiddleware } = require('../middlewares/auth-middleware');
const { CarControllers } = require('../controllers/cars');
const { carSchema } = require('../utils/joiValidation');

router.get('/', CheckRole(['superadmin', 'admin', 'member']), CarControllers.getAll);
router.get('/:id', CheckRole(['superadmin', 'admin', 'member']), CarControllers.find);
router.post('/', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), upload.array('images'), validatorMiddleware(carSchema), CarControllers.create);
router.put('/:id', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), upload.array('images'), validatorMiddleware(carSchema), CarControllers.update);
router.delete('/:id', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), CarControllers.delete);

module.exports = router;
