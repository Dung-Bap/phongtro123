const asyncHandler = require('express-async-handler');
const db = require('../models');
const { v4 } = require('uuid');
const chothuecanho = require('../../data/chothuecanho.json');
const chothuematbang = require('../../data/chothuematbang.json');
const chothuephongtro = require('../../data/chothuephongtro.json');
const nhachothue = require('../../data/nhachothue.json');
const { hashPassword, generateCode } = require('../ultils/helpers');

const dataBody = chothuecanho.body;

const insert = asyncHandler((req, res) => {
    dataBody?.forEach(async item => {
        let postId = v4();
        let labelCode = generateCode(item?.header?.class?.classType);
        let attributesId = v4();
        let userId = v4();
        let imagesId = v4();
        let overviewId = v4();
        let categoryId = v4();
        await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            address: item?.header?.address,
            categoryCode: 'CTCH',
            description: JSON.stringify(item?.mainContent?.content),
            labelCode,
            attributesId,
            userId,
            overviewId,
            imagesId,
        });
        await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
        });
        // await db.Image.create({
        //     id: imagesId,
        //     image: JSON.stringify(item?.images),
        // });
        await db.Label.findOrCreate({
            where: { code: labelCode },
            default: {
                code: labelCode,
                value: item?.header?.class?.classType,
            },
        });
        // await db.Overview.create({
        //     id: overviewId,
        //     code: item?.overview?.content.find(i => i.name === 'Mã tin:')?.content,
        //     area: item?.overview?.content.find(i => i.name === 'Khu vực')?.content,
        //     type: item?.overview?.content.find(i => i.name === 'Loại tin rao:')?.content,
        //     target: item?.overview?.content.find(i => i.name === 'Đối tượng thuê:')?.content,
        //     bonus: item?.overview?.content.find(i => i.name === 'Gói tin:')?.content,
        //     created: item?.overview?.content.find(i => i.name === 'Ngày đăng:')?.content,
        //     expired: item?.overview?.content.find(i => i.name === 'Ngày hết hạn:')?.content,
        // });
        await db.User.create({
            id: userId,
            name: item?.contact?.content.find(i => i.name === 'Liên hệ:')?.content,
            phone: item?.contact?.content.find(i => i.name === 'Điện thoại:')?.content,
            zalo: item?.contact?.content.find(i => i.name === 'Zalo')?.content,
            password: hashPassword('123456'),
        });
        // await db.Category.create({
        //     id: categoryId,
        //     code: 'CTCH',
        //     value: 'Cho thuê căn hộ',
        //     header: chothuecanho?.header?.title,
        //     subheader: chothuecanho?.header?.description,
        // });
    });
    return res.json('Done hihi');
});

module.exports = {
    insert,
};
