//! Controller
//TODO: handle req, res & body validation
const createHttpError = require('http-errors');
const { AuthsService } = require('../services/auths');

class UsersController {
	// update for superadmin to all users (belum selesai)
	static update = async (req, res, next) => {
		try {
			const { userExist, newUser, authUser } = await AuthsService.register(req.user, req.body, req.files);

			// hashing password
			const saltRounds = 10;
			const hashedPassword = bcrypt.hashSync(password, saltRounds);
			const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

			res.status(201).json({
				status: true,
				message: 'update user successfully!',
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
}

module.exports = {
	UsersController,
};
