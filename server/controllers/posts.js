const asyncHandle = require('express-async-handler');
const db = require('../models');
const { dataPrice, dataAcreage } = require('../ultils/data');
const { generateCode, convertNumberToString } = require('../ultils/helpers');
const moment = require('moment/moment');
const { v4 } = require('uuid');

const getPosts = asyncHandle(async (req, res) => {
    const queries = { ...req.query };
    const { page, ...q } = queries;
    const limit = +req.query.limit || +process.env.LIMIT_PRODUCT;
    const offset = (+page - 1) * limit || 0;
    const response = await db.Post.findAndCountAll({
        offset,
        limit,
        where: q,
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
        order: [['star', 'DESC']],
    });

    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !',
    });
});

const getNews = asyncHandle(async (req, res) => {
    const response = await db.Post.findAll({
        raw: true,
        nest: true,
        limit: +process.env.LIMIT_NEWS,
        include: [
            {
                model: db.Image,
                as: 'images',
                attributes: ['image'],
            },
            {
                model: db.Attribute,
                as: 'attributes',
                attributes: ['price', 'published'],
            },
        ],
        attributes: ['id', 'title'],
        order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !',
    });
});

const createNewPost = asyncHandle(async (req, res) => {
    const { title, address, categoryCode, price, acreage, description, labelBody, area, category, gender, userId } =
        req.body;
    const images = req?.files?.images?.map(el => el.path);
    if (images) req.body.images = images;
    if (!(title && address && categoryCode && price && acreage && description && labelBody && area && category))
        throw new Error('Missing Inputs');

    let addressFix = address.replace('Thành phố', '').replace('Tỉnh', '');
    let labelCode = generateCode(labelBody).trim();
    let provinceCode = generateCode(addressFix.split(',')?.slice(-1)[0]).trim();
    let postId = v4();
    let attributesId = v4();
    let imagesId = v4();
    let overviewId = v4();
    let hashtag = Math.floor(Math.random() * Math.pow(10, 6));
    let priceNumber = price / Math.pow(10, 6);
    await db.Post.create({
        id: postId,
        title: title,
        address: addressFix,
        categoryCode: categoryCode,
        priceCode: dataPrice.find(item => item.min <= priceNumber && item.max >= priceNumber)?.code,
        acreageCode: dataAcreage.find(item => item.min <= acreage && item.max >= acreage)?.code,
        description: JSON.stringify(description),
        labelCode,
        provinceCode,
        attributesId,
        userId,
        overviewId,
        imagesId,
    });
    await db.Attribute.create({
        id: attributesId,
        price: convertNumberToString(priceNumber),
        acreage: `${acreage}m2`,
        published: moment(Date.now()).format('dddd, Do MM YYYY'),
        hashtag,
    });
    await db.Image.create({
        id: imagesId,
        image: JSON.stringify(images),
    });
    await db.Overview.create({
        id: overviewId,
        code: `#${hashtag}`,
        area: area,
        type: category,
        target: gender,
        bonus: 'Tin VIP nổi bật',
        created: moment(Date.now()).format('dddd, Do MM YYYY'),
    });
    await db.Label.findOrCreate({
        where: {
            code: labelCode,
        },
        defaults: {
            code: labelCode,
            value: labelBody,
        },
    });
    const response = await db.Province.findOrCreate({
        where: {
            code: provinceCode,
        },
        defaults: {
            code: provinceCode,
            value: addressFix.split(',')?.slice(-1)[0].trim(),
        },
    });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Tạo mới bài đăng thành công !!!' : 'Có gì đó sai sai !',
    });
});

module.exports = {
    getPosts,
    getNews,
    createNewPost,
};
