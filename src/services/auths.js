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

	static register = async (userLoggedIn, body) => {
		const { name, email, role, password, confirmPassword } = body;
		const userExist = await AuthsRepository.findUser(email);

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		const { newUser, authUser } = await AuthsRepository.register(userLoggedIn, name, email, role, hashedPassword, hashedConfirmPassword);
		return { userExist, newUser, authUser };
	};

	static update = async (userLoggedIn, body) => {
		const { name, email, role, password, confirmPassword } = body;
		const userExist = await AuthsRepository.findUser(email);

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		await AuthsRepository.update(userLoggedIn, name, email, role, hashedPassword, hashedConfirmPassword);
		return { userExist, body, hashedPassword, hashedConfirmPassword };
	};
}

module.exports = {
	AuthsService,
};
