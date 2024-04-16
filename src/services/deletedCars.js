const { DeletedCarsRepository } = require('../repositories/deletedCars');

class DeletedCarsServices {
	static getAll = async (offset, limit, capacity, search) => {
		const { count, rows } = await DeletedCarsRepository.getAll(offset, limit, capacity, search);
		return { count, rows };
	};
}

module.exports = {
	DeletedCarsServices,
};
