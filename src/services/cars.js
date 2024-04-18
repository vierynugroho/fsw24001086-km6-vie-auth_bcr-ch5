//! Services
//TODO: handle business logic

require('dotenv/config');
const { CarsRepository } = require('../repositories/cars');
const handleUploadImage = require('../utils/handleUpload');

class CarServices {
	static getAll = async (offset, limit, capacity, search) => {
		const { count, rows } = await CarsRepository.getAll(offset, limit, capacity, search);
		return { count, rows };
	};

	static find = async (id) => {
		const car = await CarsRepository.findCar(id);
		return car;
	};

	static create = async (userLoggedIn, body, files) => {
		const images = {
			imagesUrl: [],
			imagesId: [],
		};

		if (files.length !== 0) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);
			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
		}

		const newCar = await CarsRepository.create(userLoggedIn, body, images);

		return { newCar };
	};

	static update = async (userLoggedIn, carId, body, files) => {
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

		const data = body || {};
		// if (data === undefined) {
		// 	throw Error('Nothing to update');
		// }

		data.user = userLoggedIn;
		data.carId = carId;
		data.imageUrl = images.imagesUrl;
		data.imageId = images.imagesId;

		const { dataUpdate } = await CarsRepository.update(data);

		return { dataUpdate };
	};

	static delete = async (id, userLoggedIn) => {
		const { deletedCar } = await CarsRepository.delete(id, userLoggedIn);

		return { deletedCar };
	};
}

module.exports = {
	CarServices,
};
