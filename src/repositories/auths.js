//! Repository
//TODO: Komunikasi DB
const { Auth, User, sequelize } = require('../databases/models');
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
		const transaction = await sequelize.transaction();

		try {
			const newUser = await User.create(
				{
					id: randomUUID(),
					name,
					role,
				},
				{ transaction }
			);

			const authUser = await Auth.create(
				{
					id: randomUUID(),
					email,
					password: hashedPassword,
					confirmPassword: hashedConfirmPassword,
					userId: newUser.id,
				},
				{
					transaction,
				}
			);

			await transaction.commit();
			return { newUser, authUser };
		} catch (error) {
			await transaction.rollback();
			throw new Error(error.message);
		}
	};

	static update = async (userLoggedIn, data) => {
		const transaction = await sequelize.transaction();
		try {
			await User.update(
				data,
				{
					where: {
						id: userLoggedIn.id,
					},
				},
				{ transaction }
			);

			await Auth.update(
				data,
				{
					where: {
						id: userLoggedIn.Auth.id,
					},
				},
				{ transaction }
			);
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw new Error(error.message);
		}
	};

	static delete = async (userLoggedIn) => {
		const userExist = await this.findUser(userLoggedIn.Auth.email);

		const authId = userExist.id;
		const userId = userLoggedIn.id;

		const transaction = await sequelize.transaction();
		try {
			const deleteAuth = await Auth.destroy(
				{
					where: {
						id: authId,
					},
				},
				{ transaction }
			);

			const deleteUser = await User.destroy(
				{
					where: {
						id: userId,
					},
				},
				{ transaction }
			);

			await transaction.commit();
			return { deleteAuth, deleteUser };
		} catch (error) {
			await transaction.rollback();
			throw new Error(error.message);
		}
	};
}

module.exports = {
	AuthsRepository,
};
