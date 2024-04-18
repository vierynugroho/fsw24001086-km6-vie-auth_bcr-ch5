//! Repository
//TODO: Komunikasi DB
const { Cars, DeletedCars, sequelize } = require('../databases/models');
const { randomUUID } = require('crypto');
const { Op, Sequelize } = require('sequelize');
const imageKit = require('../libs/imageKit');

class CarsRepository {
	static getAll = async (offset, limit, capacity, search) => {
		const { count, rows } = await Cars.findAndCountAll({
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

	static findCar = async (id) => {
		const car = await Cars.findOne({
			where: {
				id,
			},
		});

		return car;
	};

	static findByPlate = async (plate) => {
		const car = await Cars.findOne({
			where: {
				plate,
			},
		});

		return car;
	};

	static create = async (userLoggedIn, body, images) => {
		body.id = randomUUID();
		body.createdBy = userLoggedIn.name;
		body.updatedBy = '';
		body.deletedBy = '';
		body.imageUrl = images.imagesUrl;
		body.imageId = images.imagesId;

		const newCar = await Cars.create(body);

		return newCar;
	};

	static update = async (data) => {
		data.updatedBy = data.user.name;
		data.deletedBy = '';

		await Cars.update(data, {
			where: {
				id: data.carId,
			},
		});

		return { dataUpdate: data };
	};

	static delete = async (id, userLoggedIn) => {
		const car = await Cars.findOne({
			where: {
				id,
			},
		});

		const transaction = await sequelize.transaction();
		try {
			const deletedCar = await DeletedCars.create(
				{
					id: randomUUID(),
					carId: car.id,
					plate: car.plate,
					capacity: car.capacity,
					type: car.type,
					year: car.year,
					rentPerDay: car.rentPerDay,
					manufacture: car.manufacture,
					description: car.description,
					availableAt: car.availableAt,
					available: car.available,
					transmission: car.transmission,
					imageUrl: car.imageUrl,
					imageId: car.imageUrl,
					createdBy: car.createdBy,
					updatedBy: car.updatedBy,
					deletedBy: userLoggedIn.name,
				},
				{ transaction }
			);

			if (car.imageUrl.length !== 0 || car.imageId.length !== 0) {
				await imageKit.deleteFile(car.imageId[0]);
			}

			await Cars.destroy(
				{
					where: { id: car.id },
				},
				{ transaction }
			);

			await transaction.commit();
			return { deletedCar };
		} catch (error) {
			await transaction.rollback();
			throw new Error(error.message);
		}
	};
}

module.exports = {
	CarsRepository,
};
