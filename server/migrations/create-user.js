'use strict';
// npx sequelize db:migrate
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            zalo: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            fbUrl: {
                type: Sequelize.STRING,
            },
            avatar: {
                // type: Sequelize.BLOB('long'), // để avatar có dung lượng ảnh tốt hơn
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
        await queryInterface.dropTable('Users');
    },
};
