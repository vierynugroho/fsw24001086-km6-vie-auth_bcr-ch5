const createHttpError = require('http-errors');
const { DeletedCarsServices } = require('../services/deletedCars');

class DeletedCarsControllers {
	static getAll = async (req, res, next) => {
		try {
			const capacity = req.query.capacity || '0';
			const search = req.query.search || '';
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const offset = (page - 1) * limit;

			const { count, rows } = await DeletedCarsServices.getAll(offset, limit, capacity, search);

			res.status(200).json({
				status: true,
				message: 'get all deleted cars data success',
				pagination: {
					totalItems: count,
					totalPages: Math.ceil(count / limit),
					currentPage: +page,
					pageItems: rows.length,
					nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
					prevPage: page > 1 ? page - 1 : null,
				},
				data: rows,
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};
}

module.exports = {
	DeletedCarsControllers,
};
