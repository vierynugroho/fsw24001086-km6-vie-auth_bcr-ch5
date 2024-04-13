//! Controller
//TODO: handle req, res & body validation
const createHttpError = require('http-errors');

const getUsers = async (req, res, next) => {
	try {
		res.status(200).json({
			status: true,
			totalData: 1,
			data: null,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
};

module.exports = { getUsers };
