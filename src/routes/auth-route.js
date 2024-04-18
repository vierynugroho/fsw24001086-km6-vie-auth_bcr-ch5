const express = require('express');

const router = express.Router();

const validatorMiddleware = require('../middlewares/validator-middleware');
const CheckRole = require('../middlewares/role-middleware');
const { AuthsMiddleware } = require('../middlewares/auth-middleware');

const { loginSchema, onlyMemberUpdate, onlyAdminUpdate, onlySuperAdmin, onlyMemberAndAdmin, onlySuperAdminUpdate } = require('../utils/joiValidation');
const { AuthsController } = require('../controllers/auths');

router.post('/superadmin/register', AuthsMiddleware.authentication, CheckRole(['superadmin']), validatorMiddleware(onlySuperAdmin), AuthsController.register);
router.post('/admin/register', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), validatorMiddleware(onlyMemberAndAdmin), AuthsController.register);
router.post('/register', validatorMiddleware(onlyMemberAndAdmin), AuthsController.register);

router.post('/login', validatorMiddleware(loginSchema), AuthsController.login);

router.patch('/superadmin/profile', AuthsMiddleware.authentication, CheckRole(['superadmin']), validatorMiddleware(onlySuperAdminUpdate), AuthsController.update);
router.patch('/admin/profile', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin']), validatorMiddleware(onlyAdminUpdate), AuthsController.update);
router.patch('/profile', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin', 'member']), validatorMiddleware(onlyMemberUpdate), AuthsController.update);

router.delete('/profile', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin', 'member']), AuthsController.delete);

router.get('/me', AuthsMiddleware.authentication, CheckRole(['superadmin', 'admin', 'member']), AuthsController.userLoggedIn);

module.exports = router;
