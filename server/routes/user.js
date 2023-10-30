const router = require('express').Router();
const ctrls = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
router.get('/current', verifyToken, ctrls.getCurrent);
router.put('/update', verifyToken, uploader.single('avatar'), ctrls.updateUser);

module.exports = router;
