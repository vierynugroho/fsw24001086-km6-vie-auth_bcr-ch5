//! Services
//TODO: handle business logic

require('dotenv/config');
const bcrypt = require('bcrypt');
const { CarsRepository } = require('../repositories/cars');
const handleUploadImage = require('../utils/handleUpload');

class CarServices {
	static getAll = async () => {
		const cars = await CarsRepository.getAll();
		return cars;
	};

	static find = async (id) => {
		const car = await CarsRepository.findCar(id);
		return car;
	};

	static create = async (userLoggedIn, body, files) => {
		const { plate, capacity, type, year, rentPerDay, manufacture, description, availableAt, available, transmission } = body;

		const images = {
			imagesUrl: [],
			imagesId: [],
		};

		if (!files.length === 0) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);
			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
		}

		const newCar = await CarsRepository.create(userLoggedIn, plate, capacity, type, year, rentPerDay, manufacture, description, availableAt, available, transmission, images);

		return { newCar };
	};

	static update = async (userLoggedIn, carId, body, files) => {
		const { plate, capacity, type, year, rentPerDay, manufacture, description, availableAt, available, transmission } = body;

		const carExist = await CarsRepository.findCar(carId);

		const images = {
			imagesUrl: carExist.imageUrl,
			imagesId: carExist.imageId,
		};

		if (files.length !== 0) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);
			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
		}

		const updatedCar = await CarsRepository.update(userLoggedIn, carId, plate, capacity, type, year, rentPerDay, manufacture, description, availableAt, available, transmission, images);

		return { updatedCar };
	};

	static delete = async (id, userLoggedIn) => {
		const { deletedCar } = await CarsRepository.delete(id, userLoggedIn);

		return { deletedCar };
	};
}

module.exports = {
	CarServices,
};
