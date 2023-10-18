const router = require('express').Router();
const ctrls = require('../controllers/acreage');

router.get('/', ctrls.getAcreages);

module.exports = router;
