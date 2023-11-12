const asyncHandler = require('express-async-handler');
const db = require('../models');
const { v4 } = require('uuid');
const chothuecanho = require('../data/chothuecanho.json');
const chothuematbang = require('../data/chothuematbang.json');
const chothuephongtro = require('../data/chothuephongtro.json');
const nhachothue = require('../data/nhachothue.json');
const { dataPrice, dataAcreage } = require('../ultils/data');
const {
    hashPassword,
    generateCode,
    convertStringToNumberAcreage,
    convertStringToNumberPrice,
} = require('../ultils/helpers');

const datas = [
    {
        body: chothuecanho.body,
        code: 'CTCH',
        value: 'Cho thuê căn hộ',
        header: 'Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, Mới Nhất 2023',
        subheader:
            'Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.',
    },
    {
        body: chothuematbang.body,
        code: 'CTMB',
        value: 'Cho thuê mặt bằng',
        header: 'Cho Thuê Mặt Bằng, Cho Thuê Văn Phòng, Cửa Hàng, Kiot, Mới Nhất 2023',
        subheader:
            'Cho thuê mặt bằng - Kênh đăng tin cho thuê mặt bằng, cho thuê cửa hàng, cho thuê kiot số 1: giá rẻ, mặt tiền, khu đông dân cư, phù hợp kinh doanh.',
    },
    {
        body: chothuephongtro.body,
        code: 'CTPT',
        value: 'Cho thuê phòng trọ',
        header: 'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023',
        subheader:
            'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2022. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.',
    },
    {
        body: nhachothue.body,
        code: 'NCT',
        value: 'Nhà cho thuê',
        header: 'Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2023',
        subheader:
            'Cho thuê nhà nguyên căn - Kênh đăng tin cho thuê nhà số 1: giá rẻ, chính chủ, miễn trung gian, đầy đủ tiện nghi, mức giá, diện tích cho thuê khác nhau.',
    },
];

const insert = asyncHandler(async (req, res) => {
    const label = [];
    const province = [];
    datas.forEach(async data => {
        data?.body?.forEach(async item => {
            let labelCode = generateCode(item?.header?.class?.classType).trim();
            label?.every(item => item.code !== labelCode) &&
                label.push({
                    code: labelCode,
                    value: item?.header?.class?.classType,
                });
            let provinceCode = generateCode(item?.header?.address?.split(',')?.slice(-1)[0]).trim();
            province?.every(item => item.code !== provinceCode) &&
                province.push({
                    code: provinceCode,
                    value: item?.header?.address?.split(',')?.slice(-1)[0],
                });
            let postId = v4();
            let attributesId = v4();
            let userId = v4();
            let imagesId = v4();
            let overviewId = v4();
            let priceNumber = convertStringToNumberPrice(item?.header?.attributes?.price);
            let acreageNumber = convertStringToNumberAcreage(item?.header?.attributes?.acreage);
            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                star: item?.header?.star,
                address: item?.header?.address,
                categoryCode: data?.code,
                priceCode: dataPrice.find(item => item.min <= priceNumber && item.max >= priceNumber)?.code,
                acreageCode: dataAcreage.find(item => item.min <= acreageNumber && item.max >= acreageNumber)?.code,
                description: JSON.stringify(item?.mainContent?.content),
                labelCode,
                provinceCode,
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
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(item?.images),
            });
            await db.Overview.create({
                id: overviewId,
                code: item?.overview?.content.find(i => i.name === 'Mã tin:')?.content,
                area: item?.overview?.content.find(i => i.name === 'Khu vực')?.content,
                type: item?.overview?.content.find(i => i.name === 'Loại tin rao:')?.content,
                target: item?.overview?.content.find(i => i.name === 'Đối tượng thuê:')?.content,
                bonus: item?.overview?.content.find(i => i.name === 'Gói tin:')?.content,
                created: item?.overview?.content.find(i => i.name === 'Ngày đăng:')?.content,
                expired: item?.overview?.content.find(i => i.name === 'Ngày hết hạn:')?.content,
            });
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find(i => i.name === 'Liên hệ:')?.content,
                phone: item?.contact?.content.find(i => i.name === 'Điện thoại:')?.content,
                zalo: item?.contact?.content.find(i => i.name === 'Zalo')?.content,
                password: hashPassword('123456'),
            });
        });
        let categoryId = v4();

        await db.Category.create({
            id: categoryId,
            code: data?.code,
            value: data.value,
            header: data.header,
            subheader: data.subheader,
        });
    });
    label.forEach(async item => {
        await db.Label.create(item);
    });
    province.forEach(async item => {
        await db.Province.create(item);
    });
    dataPrice.forEach(async (item, index) => {
        await db.Price.create({
            idPrice: +index + 1,
            code: item?.code,
            value: item?.value,
        });
    });
    dataAcreage.forEach(async (item, index) => {
        await db.Acreage.create({
            idAcreage: +index + 1,
            code: item?.code,
            value: item?.value,
        });
    });

    return res.json('Done hihi');
});

module.exports = {
    insert,
};
