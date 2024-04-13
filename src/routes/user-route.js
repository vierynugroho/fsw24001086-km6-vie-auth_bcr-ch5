const express = require('express');

const router = express.Router();

const upload = require('../middlewares/upload-middleware');
const validatorMiddleware = require('../middlewares/validator-middleware');
const Authenticate = require('../middlewares/auth-middleware');
const CheckRole = require('../middlewares/role-middleware');

const { registerSchema, loginSchema, updateUserSchema } = require('../utils/joiValidation');
const { getUsers } = require('../controllers/users');

router.get('/', getUsers);
// router.get('/:id');

//TODO: superadmin
router.post('/sudo/register', Authenticate, CheckRole(['superadmin']), upload.array('images'), validatorMiddleware(registerSchema));
//TODO: admin
router.post('/register', Authenticate, CheckRole(['admin', 'superadmin']), upload.array('images'), validatorMiddleware(registerSchema));

//TODO: user
router.put('/profile/:id', Authenticate, upload.array('images'), validatorMiddleware(updateUserSchema));

router.delete('/profile/:id', Authenticate);

router.get('/me', Authenticate);
router.post('/login', validatorMiddleware(loginSchema));

module.exports = router;
