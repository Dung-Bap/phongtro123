const router = require('express').Router();
const ctrls = require('../controllers/province');

router.get('/', ctrls.getProvinces);

module.exports = router;
