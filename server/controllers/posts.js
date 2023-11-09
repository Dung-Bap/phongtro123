const asyncHandle = require('express-async-handler');
const db = require('../models');
const { dataPrice, dataAcreage } = require('../ultils/data');
const { generateCode, convertNumberToString, formatCreateTime } = require('../ultils/helpers');
const { v4 } = require('uuid');

const getPost = asyncHandle(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Missing Input');
    const response = await db.Post.findOne({
        where: { id },
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
                attributes: ['name', 'phone', 'zalo', 'avatar'],
            },
            {
                model: db.Overview,
                as: 'overviews',
                attributes: ['code', 'area', 'type', 'target', 'bonus', 'created'],
            },
            {
                model: db.Label,
                as: 'labels',
                attributes: ['code', 'value'],
            },
        ],
    });
    return res.status(200).json({
        success: response ? true : false,
        post: response ? response : 'Something went wrong!',
    });
});

const getPosts = asyncHandle(async (req, res) => {
    const queries = { ...req.query };
    const { page, order, ...q } = queries;
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
                attributes: ['name', 'phone', 'zalo', 'avatar'],
            },
            {
                model: db.Overview,
                as: 'overviews',
                attributes: ['created'],
            },
        ],
        attributes: ['id', 'title', 'star', 'description', 'address', 'createdAt'],
        order: [order],
    });

    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !',
    });
});

const getPostsManage = asyncHandle(async (req, res) => {
    const { id } = req.user;
    const queries = { ...req.query };
    const { page, ...q } = queries;
    const limit = +req.query.limit || +process.env.LIMIT_PRODUCT;
    const offset = (+page - 1) * limit || 0;
    const response = await db.Post.findAndCountAll({
        offset,
        limit,
        where: { ...q, userId: id },
        raw: true,
        nest: true,
        include: [
            {
                model: db.Image,
                as: 'images',
                attributes: ['image', 'id'],
            },
            {
                model: db.Attribute,
                as: 'attributes',
                attributes: ['price', 'published', 'acreage', 'id'],
            },
            {
                model: db.Overview,
                as: 'overviews',
                attributes: ['code', 'target', 'id'],
            },
        ],
        // attributes: ['id', 'title', 'address'],
        order: [['createdAt', 'DESC']],
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
            {
                model: db.Overview,
                as: 'overviews',
                attributes: ['created'],
            },
        ],
        attributes: ['id', 'title', 'createdAt'],
        order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !',
    });
});

const createNewPost = asyncHandle(async (req, res) => {
    const { id } = req.user;
    const { title, address, categoryCode, price, acreage, description, labelBody, area, category, gender } = req.body;
    const images = req?.files?.images?.map(el => el.path);
    if (images) req.body.images = images;
    if (
        !(
            title &&
            address &&
            categoryCode &&
            price &&
            acreage &&
            description &&
            labelBody &&
            area &&
            category &&
            images
        )
    )
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
        address: address,
        categoryCode: categoryCode,
        priceCode: dataPrice.find(item => item.min <= priceNumber && item.max >= priceNumber)?.code,
        acreageCode: dataAcreage.find(item => item.min <= acreage && item.max >= acreage)?.code,
        description: JSON.stringify(description),
        labelCode,
        provinceCode,
        attributesId,
        userId: id,
        overviewId,
        imagesId,
    });
    await db.Attribute.create({
        id: attributesId,
        price: convertNumberToString(priceNumber),
        acreage: `${acreage}m2`,
        published: formatCreateTime(),
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
        created: formatCreateTime(),
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

const updatePost = asyncHandle(async (req, res) => {
    const {
        title,
        address,
        categoryCode,
        price,
        acreage,
        description,
        labelBody,
        area,
        category,
        gender,
        postId,
        attributeId,
        imagesId,
        overviewId,
    } = req.body;
    const images = req?.files?.images?.map(el => el.path);
    if (images) req.body.images = images;

    if (!(title && address && categoryCode && price && acreage && description && labelBody && area && category))
        throw new Error('Missing Inputs');

    let addressFix = address.replace('Thành phố', '').replace('Tỉnh', '');
    let labelCode = generateCode(labelBody).trim();
    let provinceCode = generateCode(addressFix.split(',')?.slice(-1)[0]).trim();
    let priceNumber = price / Math.pow(10, 6);
    await db.Post.update(
        {
            title: title,
            address: address,
            categoryCode: categoryCode,
            priceCode: dataPrice.find(item => item.min <= priceNumber && item.max >= priceNumber)?.code,
            acreageCode: dataAcreage.find(item => item.min <= acreage && item.max >= acreage)?.code,
            description: JSON.stringify(description),
            labelCode,
            provinceCode,
        },
        {
            where: {
                id: postId,
            },
        }
    );
    await db.Attribute.update(
        {
            price: convertNumberToString(priceNumber),
            acreage: `${acreage}m2`,
        },
        {
            where: {
                id: attributeId,
            },
        }
    );
    await db.Image.update(
        {
            image: JSON.stringify(images),
        },
        {
            where: {
                id: imagesId,
            },
        }
    );
    await db.Overview.update(
        {
            area: area,
            type: category,
            target: gender,
        },
        {
            where: {
                id: overviewId,
            },
        }
    );
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
        message: response ? 'Cập nhật thành công !!!' : 'Có gì đó sai sai !',
    });
});

const destroyPost = asyncHandle(async (req, res) => {
    const { id } = req.body;
    if (!id) throw new Error('Missing inputs !');
    const response = await db.Post.destroy({ where: { id } });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Xoá bài đăng thành công !' : 'Có gì đó sai sai !',
    });
});

module.exports = {
    getPost,
    getPosts,
    getNews,
    createNewPost,
    getPostsManage,
    updatePost,
    destroyPost,
};
