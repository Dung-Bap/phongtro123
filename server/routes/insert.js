const router = require('express').Router();
const ctrls = require('../controllers/insert');

router.post('/', ctrls.insert);

module.exports = router;
