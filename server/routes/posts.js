const router = require('express').Router();
const ctrls = require('../controllers/posts');

router.get('/', ctrls.getPosts);
router.get('/news', ctrls.getNews);

module.exports = router;
