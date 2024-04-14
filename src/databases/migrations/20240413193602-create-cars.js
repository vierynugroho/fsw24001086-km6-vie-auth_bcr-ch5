'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Cars', {
			id: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			plate: {
				type: Sequelize.STRING,
			},
			capacity: {
				type: Sequelize.INTEGER,
			},
			type: {
				type: Sequelize.STRING,
			},
			year: {
				type: Sequelize.INTEGER,
			},
			rentPerDay: {
				type: Sequelize.FLOAT,
			},
			manufacture: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
			},
			availableAt: {
				type: Sequelize.STRING,
			},
			available: {
				type: Sequelize.BOOLEAN,
			},
			transmission: {
				type: Sequelize.STRING,
			},
			imageUrl: {
				type: Sequelize.ARRAY(Sequelize.TEXT),
			},
			imageId: {
				type: Sequelize.ARRAY(Sequelize.TEXT),
			},
			createdBy: {
				type: Sequelize.STRING,
			},
			updatedBy: {
				type: Sequelize.STRING,
			},
			deletedBy: {
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
		await queryInterface.dropTable('Cars');
	},
};
