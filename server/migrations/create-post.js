'use strict';
// npx sequelize db:migrate
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            title: {
                type: Sequelize.STRING,
            },
            star: {
                type: Sequelize.STRING,
                defaultValue: '0',
            },
            labelCode: {
                type: Sequelize.STRING,
            },
            provinceCode: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            attributesId: {
                type: Sequelize.STRING,
            },
            categoryCode: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            acreageCode: {
                type: Sequelize.STRING,
            },
            priceCode: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.STRING,
            },
            overviewId: {
                type: Sequelize.STRING,
            },
            imagesId: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    },
};
