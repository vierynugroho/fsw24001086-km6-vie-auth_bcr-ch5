//! Services
//TODO: handle business logic

require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthsRepository } = require('../repositories/auths');

class AuthsService {
	static login = async (email, password) => {
		const user = await AuthsRepository.findUser(email);

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = jwt.sign(
				{
					id: user.userId,
					username: user.User.name,
					role: user.User.role,
					email: user.email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: process.env.JWT_EXP,
				}
			);

			return token;
		} else {
			return false;
		}
	};

	static register = async (body) => {
		const { name, email, role, password, confirmPassword } = body;

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		const { newUser, authUser } = await AuthsRepository.register(name, email, role, hashedPassword, hashedConfirmPassword);

		return { newUser, authUser };
	};

	static update = async (userLoggedIn, body) => {
		const { password, confirmPassword } = body;

		if (password) {
			const saltRounds = 10;
			const hashedPassword = bcrypt.hashSync(password, saltRounds);
			const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

			(body.password = hashedPassword), (body.confirmPassword = hashedConfirmPassword);
		}

		await AuthsRepository.update(userLoggedIn, body);
		return { body };
	};

	static delete = async (userLoggedIn) => {
		await AuthsRepository.delete(userLoggedIn);
	};
}

module.exports = {
	AuthsService,
};
