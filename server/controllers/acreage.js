const asyncHandler = require('express-async-handler');
const db = require('../models');

const getAcreages = asyncHandler(async (req, res) => {
    const response = await db.Acreage.findAll({ raw: true });
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !',
    });
});

module.exports = { getAcreages };
