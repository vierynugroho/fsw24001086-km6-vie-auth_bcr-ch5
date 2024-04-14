const express = require('express');

const router = express.Router();

const validatorMiddleware = require('../middlewares/validator-middleware');
const CheckRole = require('../middlewares/role-middleware');
const { AuthsMiddleware } = require('../middlewares/auth-middleware');

const { registerSchema, loginSchema, updateUserSchema } = require('../utils/joiValidation');
const { AuthsController } = require('../controllers/auths');

router.post('/register', AuthsMiddleware.authentication, CheckRole(['superadmin']), validatorMiddleware(registerSchema), AuthsController.register);
router.post('/login', validatorMiddleware(loginSchema), AuthsController.login);
router.put('/profile', AuthsMiddleware.authentication, validatorMiddleware(updateUserSchema), AuthsController.update);
router.get('/me', AuthsMiddleware.authentication, AuthsController.userLoggedIn);

module.exports = router;
