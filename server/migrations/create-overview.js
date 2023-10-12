'use strict';
// npx sequelize db:migrate
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Overviews', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            code: {
                type: Sequelize.STRING,
            },
            area: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            target: {
                type: Sequelize.STRING,
            },
            bonus: {
                type: Sequelize.STRING,
            },
            created: {
                type: Sequelize.DATE,
            },
            expired: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('Overviews');
    },
};
