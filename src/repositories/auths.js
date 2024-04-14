//! Repository
//TODO: Komunikasi DB
const { Auth, User, Car } = require('../databases/models');
const { randomUUID } = require('crypto');

class AuthsRepository {
	static findUser = async (email) => {
		const user = await Auth.findOne({
			where: {
				email,
			},
			include: ['User'],
		});

		return user;
	};

	static register = async (userLoggedIn, name, email, role, hashedPassword, hashedConfirmPassword) => {
		const newUser = await User.create({
			id: randomUUID(),
			name,
			companyId: userLoggedIn.companyId,
			role,
		});

		const authUser = await Auth.create({
			id: randomUUID(),
			email,
			password: hashedPassword,
			confirmPassword: hashedConfirmPassword,
			userId: newUser.id,
		});

		return { newUser, authUser };
	};

	static update = async (userLoggedIn, name, email, role, hashedPassword, hashedConfirmPassword) => {
		const userExist = await this.findUser(userLoggedIn.Auth.email);

		const newUser = await User.update(
			{
				name: name || userLoggedIn.name,
				role: role || userLoggedIn.role,
			},
			{
				where: {
					id: userLoggedIn.id,
				},
			}
		);

		const authUser = await Auth.update(
			{
				email: email || userLoggedIn.Auth.email,
				password: hashedPassword || userExist.Auth.hashedPassword,
				confirmPassword: hashedConfirmPassword || userExist.Auth.hashedConfirmPassword,
			},
			{
				where: {
					id: userLoggedIn.Auth.id,
				},
			}
		);

		return { newUser, authUser };
	};
}

module.exports = {
	AuthsRepository,
};
