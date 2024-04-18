const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../databases/models');

class AuthsMiddleware {
	static authentication = async (req, res, next) => {
		try {
			const bearerToken = req.headers.authorization;

			if (!bearerToken) {
				return next(createHttpError(500, { message: 'Token not found!' }));
			}

			const token = bearerToken.split('Bearer ')[1];

			const payload = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findByPk(payload.id, {
				include: ['Auth'],
			});

			if (!user) {
				return next(createHttpError(401, { message: 'Unauthorized, please login' }));
			}

			req.user = user;
			next();
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};
}

module.exports = { AuthsMiddleware };
