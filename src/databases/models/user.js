'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasOne(models.Auth, {
				foreignKey: {
					name: 'userId',
				},
			});
		}
	}
	User.init(
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
			name: { type: DataTypes.STRING, allowNull: false },
			role: {
				type: DataTypes.ENUM('superadmin', 'admin', 'member'),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
