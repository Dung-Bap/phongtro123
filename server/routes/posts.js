const router = require('express').Router();
const ctrls = require('../controllers/posts');

router.get('/', ctrls.getPosts);

module.exports = router;
