const router = require('express').Router();
const ctrls = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
router.get('/current', verifyToken, ctrls.getCurrent);

module.exports = router;
