const router = require('express').Router();
const ctrls = require('../controllers/posts');
const uploader = require('../config/cloudinary.config');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', ctrls.getPosts);
router.get('/news', ctrls.getNews);
router.post('/create', [verifyToken], uploader.fields([{ name: 'images', maxCount: 10 }]), ctrls.createNewPost);
router.get('/manage', [verifyToken], ctrls.getPostsManage);
router.put('/update', [verifyToken], uploader.fields([{ name: 'images', maxCount: 10 }]), ctrls.updatePost);
router.delete('/destroy', ctrls.destroyPost);

router.get('/:id', ctrls.getPost);

module.exports = router;
