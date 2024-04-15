'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const cars = JSON.parse(fs.readFileSync('./public/data/cars.json', 'utf8'));

		cars.map((car) => {
			car.createdAt = new Date();
			car.updatedAt = new Date();

			car.createdBy = 'superadmin';
			car.updatedBy = '';
			car.deletedBy = '';
		});

		return queryInterface.bulkInsert('Cars', cars);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Cars', null, {});
	},
};
