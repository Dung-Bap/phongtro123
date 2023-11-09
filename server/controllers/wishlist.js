const asyncHandle = require('express-async-handler');
const db = require('../models');
const { dataPrice, dataAcreage } = require('../ultils/data');
const { generateCode, convertNumberToString, formatCreateTime } = require('../ultils/helpers');
const { v4 } = require('uuid');

const createWishlist = asyncHandle(async (req, res) => {
    const { id } = req.user;
    const { image, star, address, price, acreage, created, description, userPost, userPhone, userZalo, postId } =
        req.body;
    if (
        !(
            image ||
            star ||
            address ||
            price ||
            acreage ||
            created ||
            description ||
            userPost ||
            userPhone ||
            userZalo ||
            postId
        )
    )
        throw new Error('Missing inputs');

    let like = await db.Wishlist.findOne({
        where: { id: postId },
    });
    console.log(like);

    if (!like) {
        let newLike = await db.Wishlist.create({
            id: postId,
            image,
            star,
            address,
            price,
            acreage,
            created,
            description,
            userPost,
            userPhone,
            userZalo,
            userId: id,
        });
    } else {
        await db.Wishlist.destroy({
            where: {
                id: {
                    postId,
                },
            },
        });
    }
});

module.exports = { createWishlist };
