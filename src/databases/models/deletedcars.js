'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DeletedCars extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			DeletedCars.belongsTo(models.Cars, {
				foreignKey: {
					name: 'carId',
				},
			});
		}
	}
	DeletedCars.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				unique: {
					args: true,
					msg: 'Please enter unique id',
				},
			},
			carId: { type: DataTypes.STRING, allowNull: false },
			plate: { type: DataTypes.STRING, allowNull: false },
			capacity: { type: DataTypes.INTEGER, allowNull: false },
			type: { type: DataTypes.STRING, allowNull: false },
			year: { type: DataTypes.INTEGER, allowNull: false },
			rentPerDay: { type: DataTypes.FLOAT, allowNull: false },
			manufacture: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.TEXT, allowNull: false },
			availableAt: { type: DataTypes.STRING, allowNull: false },
			available: { type: DataTypes.BOOLEAN, allowNull: false },
			transmission: { type: DataTypes.STRING, allowNull: false },
			imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
			imageId: DataTypes.ARRAY(DataTypes.TEXT),
			createdBy: { type: DataTypes.STRING, allowNull: false },
			updatedBy: { type: DataTypes.STRING, allowNull: false },
			deletedBy: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: 'DeletedCars',
		}
	);
	return DeletedCars;
};
