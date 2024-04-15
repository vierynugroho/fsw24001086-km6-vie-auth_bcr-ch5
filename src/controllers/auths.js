//! Controller
//TODO: handle req, res & body validation
const createHttpError = require('http-errors');
const { AuthsService } = require('../services/auths');
const { AuthsRepository } = require('../repositories/auths');

class AuthsController {
	static login = async (req, res, next) => {
		try {
			const { email, password } = req.body;

			const token = await AuthsService.login(email, password);

			if (token === false) {
				next(
					createHttpError(400, {
						message: 'Wrong Password or user not found',
					})
				);
			} else {
				res.status(200).json({
					status: true,
					message: 'Login Success',
					_token: token,
				});
			}
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};

	static register = async (req, res, next) => {
		try {
			const userExist = await AuthsRepository.findUser(req.body.email);
			if (userExist) {
				return next(createHttpError(400, { message: 'User email already taken' }));
			}

			const { newUser, authUser } = await AuthsService.register(req.body);

			res.status(201).json({
				status: true,
				message: 'create user successfully!',
				data: {
					user: {
						id: newUser.id,
						name: newUser.name,
						role: newUser.role,
						createdAt: newUser.createdAt,
						updatedAt: newUser.updatedAt,
					},
					auth: {
						id: authUser.id,
						userId: authUser.userId,
						email: authUser.email,
						password: authUser.password,
						confirmPassword: authUser.confirmPassword,
						createdAt: authUser.createdAt,
						updatedAt: authUser.updatedAt,
					},
				},
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};

	static userLoggedIn = async (req, res, next) => {
		try {
			const user = req.user;
			if (!user) return next(createHttpError(401, { message: 'Unauthorized' }));

			res.status(200).json({
				status: true,
				data: {
					user: {
						id: user.id,
						name: user.name,
						role: user.role,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
					},
					auth: {
						id: user.Auth.id,
						userId: user.Auth.userId,
						email: user.Auth.email,
						password: user.Auth.password,
						createdAt: user.Auth.createdAt,
						updatedAt: user.Auth.updatedAt,
					},
				},
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};

	static update = async (req, res, next) => {
		try {
			const users = await AuthsRepository.getAll();
			let usersEmail = [];

			users.map((user) => {
				usersEmail.push(user.email);
			});

			const userLogged_email = req.user.Auth.email;

			if (usersEmail.includes(req.body.email)) {
				if (req.body.email !== userLogged_email) {
					return next(createHttpError(400, { message: 'User email already taken' }));
				} else {
					delete req.body.email;
				}
			}

			const { name, email, role, hashedPassword, hashedConfirmPassword } = await AuthsService.update(req.user, req.body);

			res.status(201).json({
				status: true,
				message: 'update user successfully!',
				data: {
					user: {
						name: name,
						role: role,
					},
					auth: {
						email: email || userLogged_email,
						password: hashedPassword,
						confirmPassword: hashedConfirmPassword,
					},
				},
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};

	static delete = async (req, res, next) => {
		try {
			await AuthsService.delete(req.user);
			res.status(201).json({
				status: true,
				message: 'delete user successfully!',
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};
}

module.exports = {
	AuthsController,
};
