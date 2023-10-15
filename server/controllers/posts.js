const asyncHandle = require('express-async-handler');
const db = require('../models');

const getPosts = asyncHandle(async (req, res) => {
    const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
            {
                model: db.Image,
                as: 'images',
                attributes: ['image'],
            },
            {
                model: db.Attribute,
                as: 'attributes',
                attributes: ['price', 'acreage', 'published', 'hashtag'],
            },
            {
                model: db.User,
                as: 'user',
                attributes: ['name', 'phone', 'zalo'],
            },
        ],
        attributes: ['id', 'title', 'star', 'description', 'address'],
    });

    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !',
    });
});

module.exports = {
    getPosts,
};
