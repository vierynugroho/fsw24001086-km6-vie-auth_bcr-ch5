'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Cars extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Cars.init(
		{
			id: DataTypes.STRING,
			plate: DataTypes.STRING,
			capacity: DataTypes.INTEGER,
			type: DataTypes.STRING,
			year: DataTypes.INTEGER,
			rentPerDay: DataTypes.FLOAT,
			manufacture: DataTypes.STRING,
			description: DataTypes.TEXT,
			availableAt: DataTypes.STRING,
			available: DataTypes.BOOLEAN,
			transmission: DataTypes.STRING,
			imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
			imageId: DataTypes.ARRAY(DataTypes.TEXT),
			createdBy: DataTypes.STRING,
			updatedBy: DataTypes.STRING,
			deletedBy: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Cars',
		}
	);
	return Cars;
};
