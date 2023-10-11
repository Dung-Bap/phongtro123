const userRouter = require('./user');
const { notFound, errHandler } = require('../middlewares/errorHandle');

const initRoutes = app => {
    app.use('/api/user', userRouter);

    // hứng lỗi ở cuối cùng
    app.use(notFound);
    app.use(errHandler);
};
module.exports = initRoutes;
