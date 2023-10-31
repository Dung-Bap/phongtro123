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
            User.hasOne(models.Post, { foreignKey: 'userId', as: 'user' }); // Do là quan hệ 1/1, và scraping data nên dùng hasOne
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            phone: DataTypes.STRING,
            zalo: DataTypes.STRING,
            password: DataTypes.STRING,
            fbUrl: DataTypes.STRING,
            avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
