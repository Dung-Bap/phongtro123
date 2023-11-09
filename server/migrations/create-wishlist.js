'use strict';
// npx sequelize db:migrate
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Wishlists', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            star: {
                type: Sequelize.STRING,
                defaultValue: '0',
            },
            address: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.STRING,
            },
            acreage: {
                type: Sequelize.STRING,
            },
            created: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            avatar: {
                type: Sequelize.TEXT,
            },
            userPost: {
                type: Sequelize.STRING,
            },
            userPhone: {
                type: Sequelize.STRING,
            },
            userZalo: {
                type: Sequelize.STRING,
            },
            userId: {
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
        await queryInterface.dropTable('Wishlists');
    },
};
