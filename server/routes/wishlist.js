const router = require('express').Router();
const ctrls = require('../controllers/wishlist');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/', verifyToken, ctrls.createWishlist);

module.exports = router;
