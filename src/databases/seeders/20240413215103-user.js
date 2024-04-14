'use strict';
const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const password = 'password';
		const confirmPassword = password;

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		const users_data = [
			{
				id: randomUUID(),
				name: 'super',
				role: 'superadmin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: randomUUID(),
				name: 'mimin',
				role: 'admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: randomUUID(),
				name: 'npc',
				role: 'member',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		const users = await queryInterface.bulkInsert('Users', users_data, {
			returning: true,
		});

		const auth_data = users.map((user) => ({
			id: randomUUID(),
			userId: user.id,
			email: `${user.role}@mail.com`,
			password: hashedPassword,
			confirmPassword: hashedConfirmPassword,
			createdAt: new Date(),
			updatedAt: new Date(),
		}));

		return queryInterface.bulkInsert('Auths', auth_data);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
		await queryInterface.bulkDelete('Auths', null, {});
	},
};
