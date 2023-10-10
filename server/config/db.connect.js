/** @format */

const { Sequelize } = require('sequelize'); // code sẽ được sửa trên db

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('phongtro123', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = dbConnect;
