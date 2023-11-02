'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.Image, { foreignKey: 'imagesId', targetKey: 'id', as: 'images' });
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
            Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', targetKey: 'id', as: 'attributes' });
            Post.belongsTo(models.Overview, { foreignKey: 'overviewId', targetKey: 'id', as: 'overviews' });
            Post.belongsTo(models.Label, { foreignKey: 'labelCode', targetKey: 'code', as: 'labels' });
        }
    }
    Post.init(
        {
            title: DataTypes.STRING,
            star: DataTypes.STRING,
            address: DataTypes.STRING,
            categoryCode: DataTypes.STRING,
            acreageCode: DataTypes.STRING,
            priceCode: DataTypes.STRING,
            description: DataTypes.TEXT,
            labelCode: DataTypes.STRING,
            provinceCode: DataTypes.STRING,
            attributesId: DataTypes.STRING,
            userId: DataTypes.STRING,
            overviewId: DataTypes.STRING,
            imagesId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};
