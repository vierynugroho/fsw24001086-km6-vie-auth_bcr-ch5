const express = require('express');

const router = express.Router();

const validatorMiddleware = require('../middlewares/validator-middleware');
const CheckRole = require('../middlewares/role-middleware');
const { AuthsMiddleware } = require('../middlewares/auth-middleware');

const { registerSchema, loginSchema, updateUserSchema, registerAdminMemberSchema, updateUserAdminSchema, updateUserMemberSchema } = require('../utils/joiValidation');
const { AuthsController } = require('../controllers/auths');

router.post('/superadmin/register', AuthsMiddleware.authentication, CheckRole(['superadmin']), validatorMiddleware(registerSchema), AuthsController.register);
router.post('/register', CheckRole(['superadmin', 'admin', 'member']), validatorMiddleware(registerAdminMemberSchema), AuthsController.register);

router.post('/login', validatorMiddleware(loginSchema), AuthsController.login);

router.put('/superadmin/profile', AuthsMiddleware.authentication, CheckRole(['superadmin']), validatorMiddleware(updateUserSchema), AuthsController.update);
router.put('/admin/profile', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), validatorMiddleware(updateUserAdminSchema), AuthsController.update);
router.put('/profile', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin', 'member']), validatorMiddleware(updateUserMemberSchema), AuthsController.update);
router.delete('/profile', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin', 'member']), AuthsController.delete);

router.get('/me', AuthsMiddleware.authentication, AuthsController.userLoggedIn);

module.exports = router;
