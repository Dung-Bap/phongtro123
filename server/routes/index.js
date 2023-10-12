const userRouter = require('./user');
const insertRouter = require('./insert');
const { notFound, errHandler } = require('../middlewares/errorHandle');

const initRoutes = app => {
    app.use('/api/user', userRouter);
    app.use('/api/insert', insertRouter);

    // hứng lỗi ở cuối cùng
    app.use(notFound);
    app.use(errHandler);
};
module.exports = initRoutes;
