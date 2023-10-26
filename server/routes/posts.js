const router = require('express').Router();
const ctrls = require('../controllers/posts');
const uploader = require('../config/cloudinary.config');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', ctrls.getPosts);
router.get('/news', ctrls.getNews);
router.post('/create', [verifyToken], uploader.fields([{ name: 'images', maxCount: 10 }]), ctrls.createNewPost);

module.exports = router;
