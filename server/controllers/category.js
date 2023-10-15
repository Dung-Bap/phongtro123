const asyncHandler = require('express-async-handler');
const db = require('../models');

const getCategory = asyncHandler(async (req, res) => {
    const response = await db.Category.findAll({ raw: true });
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !',
    });
});

module.exports = { getCategory };
