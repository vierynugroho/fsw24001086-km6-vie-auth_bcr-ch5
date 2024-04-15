'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Auths', {
			id: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				unique: true,
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.TEXT,
			},
			confirmPassword: {
				type: Sequelize.TEXT,
			},
			userId: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Auths');
	},
};
