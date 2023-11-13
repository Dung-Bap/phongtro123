const userRouter = require('./user');
const insertRouter = require('./insert');
const categoryRouter = require('./category');
const AcreagesRouter = require('./acreage');
const pricesRouter = require('./price');
const postsRouter = require('./posts');
const provinceRouter = require('./provinces');
const { notFound, errHandler } = require('../middlewares/errorHandle');

const initRoutes = app => {
    app.use('/api/user', userRouter);
    app.use('/api/insert', insertRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/posts', postsRouter);
    app.use('/api/prices', pricesRouter);
    app.use('/api/acreages', AcreagesRouter);
    app.use('/api/provinces', provinceRouter);

    // hứng lỗi ở cuối cùng
    app.use(notFound);
    app.use(errHandler);
};
module.exports = initRoutes;
