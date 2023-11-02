'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Label extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Label.hasMany(models.Post, { foreignKey: 'labelCode', as: 'labels' }); // Do code có thể trùng với nhiều bài post nên dùng hasMany
        }
    }
    Label.init(
        {
            code: DataTypes.STRING,
            value: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Label',
        }
    );
    return Label;
};
