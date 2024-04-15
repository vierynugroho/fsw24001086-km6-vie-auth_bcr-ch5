//! Repository
//TODO: Komunikasi DB
const { Auth, User } = require('../databases/models');
const { randomUUID } = require('crypto');

class AuthsRepository {
	static getAll = async () => {
		const users = await Auth.findAll({
			include: ['User'],
		});

		return users;
	};

	static findUser = async (email) => {
		const user = await Auth.findOne({
			where: {
				email,
			},
			include: ['User'],
		});

		return user;
	};

	static register = async (name, email, role, hashedPassword, hashedConfirmPassword) => {
		const newUser = await User.create({
			id: randomUUID(),
			name,
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

		await User.update(
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

		await Auth.update(
			{
				email: email,
				password: hashedPassword || userExist.Auth.hashedPassword,
				confirmPassword: hashedConfirmPassword || userExist.Auth.hashedConfirmPassword,
			},
			{
				where: {
					id: userLoggedIn.Auth.id,
				},
			}
		);
	};

	static delete = async (userLoggedIn) => {
		const userExist = await this.findUser(userLoggedIn.Auth.email);
		const authId = userExist.id;
		const userId = userLoggedIn.id;

		const deleteAuth = await Auth.destroy({
			where: {
				id: authId,
			},
		});

		const deleteUser = await User.destroy({
			where: {
				id: userId,
			},
		});

		return { deleteAuth, deleteUser };
	};
}

module.exports = {
	AuthsRepository,
};
