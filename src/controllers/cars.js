const createHttpError = require('http-errors');
const { CarServices } = require('../services/cars');
const { CarsRepository } = require('../repositories/cars');

class CarControllers {
	static getAll = async (req, res, next) => {
		try {
			const cars = await CarServices.getAll();

			res.status(200).json({
				status: true,
				message: 'Login Success',
				data: cars,
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
			const carExist = await CarsRepository.findByPlate(req.body.plate);
			if (carExist) {
				return next(createHttpError(400, { message: 'Number plate has been used' }));
			}

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
			const cars = await CarsRepository.getAll();
			let carsPlate = [];

			cars.map((car) => {
				carsPlate.push(car.plate);
			});

			const car = await CarsRepository.findCar(req.params.id);

			if (carsPlate.includes(req.body.plate)) {
				if (req.body.plate !== car.plate) {
					return next(createHttpError(400, { message: 'Number plate has been used' }));
				} else {
					delete req.body.plate;
				}
			}
			const { updatedCar } = await CarServices.update(req.user, req.params.id, req.body, req.files);

			res.status(201).json({
				status: true,
				message: 'updated car successfully!',
				data: {
					plate: req.body.plate,
					manufacture: req.body.manufacture,
					type: req.body.type,
					rentPerDay: req.body.rentPerDay,
					capacity: req.body.capacity,
					year: req.body.year,
					description: req.body.description,
					available: req.body.available,
					availableAt: req.body.availableAt,
					transmission: req.body.transmission,
					imageUrl: updatedCar.imageUrl,
					imageId: updatedCar.imageId,
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
			console.log(deletedCar);
			res.status(201).json({
				status: true,
				message: 'delete user successfully!',
				data: {
					...deletedCar,
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
