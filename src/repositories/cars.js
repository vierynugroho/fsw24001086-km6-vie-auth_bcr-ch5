//! Repository
//TODO: Komunikasi DB
const { Cars, DeletedCars } = require('../databases/models');
const { randomUUID } = require('crypto');
const imageKit = require('../libs/imageKit');

class CarsRepository {
	static getAll = async () => {
		const cars = await Cars.findAll();

		return cars;
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

	static create = async (userLoggedIn, plate, capacity, type, year, rentPerDay, manufacture, description, availableAt, available, transmission, images) => {
		const newCar = await Cars.create({
			id: randomUUID(),
			plate,
			capacity,
			type,
			year,
			rentPerDay,
			manufacture,
			description,
			availableAt,
			available,
			transmission,
			imageUrl: images.imagesUrl,
			imageId: images.imagesId,
			createdBy: userLoggedIn.name,
			updatedBy: '',
			deletedBy: '',
		});

		return newCar;
	};

	static update = async (userLoggedIn, carId, plate, capacity, type, year, rentPerDay, manufacture, description, availableAt, available, transmission, images) => {
		const carExist = await this.findCar(carId);
		const updatedCar = await Cars.update(
			{
				plate: plate || carExist.plate,
				capacity: capacity || carExist.capacity,
				type: type || carExist.type,
				year: year || carExist.year,
				rentPerDay: rentPerDay || carExist.rentPerDay,
				manufacture: manufacture || carExist.manufacture,
				description: description || carExist.description,
				availableAt: availableAt || carExist.availableAt,
				available: available || carExist.available,
				transmission: transmission || carExist.transmission,
				imageUrl: images.imagesUrl || carExist.imageUrl,
				imageId: images.imagesId || carExist.imageId,
				createdBy: carExist.createdBy,
				updatedBy: userLoggedIn.name,
				deletedBy: '',
			},
			{
				where: {
					id: carId,
				},
			}
		);

		return updatedCar;
	};

	static delete = async (id, userLoggedIn) => {
		const car = await Cars.findOne({
			where: {
				id,
			},
		});

		const deletedCar = await DeletedCars.create({
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
		});

		if (car.imageUrl.length !== 0 || car.imageId.length !== 0) {
			await imageKit.deleteFile(car.imageId[0]);
		}

		await Cars.destroy({
			where: { id: car.id },
		});

		return { deletedCar };
	};
}

module.exports = {
	CarsRepository,
};
