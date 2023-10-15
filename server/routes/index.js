const userRouter = require('./user');
const insertRouter = require('./insert');
const categoryRouter = require('./category');
const postsRouter = require('./posts');
const { notFound, errHandler } = require('../middlewares/errorHandle');

const initRoutes = app => {
    app.use('/api/user', userRouter);
    app.use('/api/insert', insertRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/posts', postsRouter);

    // hứng lỗi ở cuối cùng
    app.use(notFound);
    app.use(errHandler);
};
module.exports = initRoutes;
