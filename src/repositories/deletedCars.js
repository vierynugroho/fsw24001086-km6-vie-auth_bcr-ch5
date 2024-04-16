const { DeletedCars } = require('../databases/models');
const { Op, Sequelize } = require('sequelize');

class DeletedCarsRepository {
	static getAll = async (offset, limit, capacity, search) => {
		const { count, rows } = await DeletedCars.findAndCountAll({
			where: {
				capacity: {
					[Op.gte]: capacity,
				},
				manufacture: {
					[Op.iLike]: `%${search}%`,
				},
			},
			order: [[Sequelize.col('capacity'), 'ASC']],
			offset,
			limit,
		});

		return { count, rows };
	};
}

module.exports = {
	DeletedCarsRepository,
};
