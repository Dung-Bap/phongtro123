'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Wishlist.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'wishlistUser' });
        }
    }
    Wishlist.init(
        {
            image: DataTypes.STRING,
            star: DataTypes.STRING,
            address: DataTypes.STRING,
            price: DataTypes.STRING,
            acreage: DataTypes.STRING,
            created: DataTypes.STRING,
            description: DataTypes.TEXT,
            avatar: DataTypes.STRING,
            userPost: DataTypes.STRING,
            userPhone: DataTypes.STRING,
            userZalo: DataTypes.STRING,
            userId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Wishlist',
        }
    );
    return Wishlist;
};
