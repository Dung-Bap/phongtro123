const router = require('express').Router();
const ctrls = require('../controllers/price');

router.get('/', ctrls.getPrices);

module.exports = router;
