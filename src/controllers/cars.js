const createHttpError = require('http-errors');
const { CarServices } = require('../services/cars');
const { CarsRepository } = require('../repositories/cars');

class CarControllers {
	static getAll = async (req, res, next) => {
		try {
			const capacity = req.query.capacity || '0';
			const search = req.query.search || '';
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const offset = (page - 1) * limit;

			const { count, rows } = await CarServices.getAll(offset, limit, capacity, search);

			res.status(200).json({
				status: true,
				message: 'get all cars data success',
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

	static find = async (req, res, next) => {
		try {
			const car = await CarServices.find(req.params.id);

			if (!car) {
				return next(createHttpError(404, { message: 'Car not found' }));
			}

			res.status(200).json({
				status: true,
				message: 'get car detail success',
				data: car,
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};

	static create = async (req, res, next) => {
		try {
			const { newCar } = await CarServices.create(req.user, req.body, req.files);

			res.status(201).json({
				status: true,
				message: 'create car successfully!',
				data: {
					...newCar,
				},
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};

	static update = async (req, res, next) => {
		try {
			const car = await CarServices.find(req.params.id);

			if (!car) {
				return next(createHttpError(404, { message: 'Car not found' }));
			}

			const files = req.files || [];
			const { dataUpdate } = await CarServices.update(req.user, req.params.id, req.body, files);

			res.status(201).json({
				status: true,
				message: 'updated car successfully!',
				data: {
					plate: dataUpdate.plate,
					capacity: dataUpdate.capacity,
					type: dataUpdate.type,
					year: dataUpdate.year,
					rentPerDay: dataUpdate.rentPerDay,
					manufacture: dataUpdate.manufacture,
					description: dataUpdate.description,
					availableAt: dataUpdate.availableAt,
					available: dataUpdate.available,
					transmission: dataUpdate.transmission,
					imageUrl: dataUpdate.imageUrl,
					imageId: dataUpdate.imageId,
				},
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};

	static delete = async (req, res, next) => {
		try {
			const car = await CarServices.find(req.params.id);

			if (!car) {
				return next(createHttpError(404, { message: 'Car not found' }));
			}

			const { deletedCar } = await CarServices.delete(req.params.id, req.user);

			res.status(201).json({
				status: true,
				message: 'delete user successfully!',
				deleted: {
					...deletedCar.dataValues,
				},
			});
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
	};
}

module.exports = {
	CarControllers,
};
