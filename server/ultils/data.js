const { generateCode } = require('../ultils/helpers');

const prices = [
    {
        min: 0,
        max: 1,
        value: 'Dưới 1 triệu',
    },
    {
        min: 1,
        max: 2,
        value: 'Từ 1 - 2 triệu',
    },
    {
        min: 2,
        max: 3,
        value: 'Từ 2 - 3 triệu',
    },
    {
        min: 3,
        max: 5,
        value: 'Từ 3 - 5 triệu',
    },
    {
        min: 5,
        max: 7,
        value: 'Từ 5 - 7 triệu',
    },
    {
        min: 7,
        max: 10,
        value: 'Từ 7 - 10 triệu',
    },
    {
        min: 10,
        max: 15,
        value: 'Từ 10 - 15 triệu',
    },
    {
        min: 15,
        max: 999,
        value: 'Trên 15 triệu',
    },
];

const acreage = [
    {
        min: 0,
        max: 20,
        value: 'Dưới 20m2',
    },
    {
        min: 20,
        max: 30,
        value: 'Từ 20 - 30m2',
    },
    {
        min: 30,
        max: 50,
        value: 'Từ 30 - 50m2',
    },
    {
        min: 50,
        max: 70,
        value: 'Từ 50 - 70m2',
    },
    {
        min: 70,
        max: 90,
        value: 'Từ 70 - 90m2',
    },
    {
        min: 90,
        max: 999,
        value: 'Trên 90m2',
    },
];

const dataPrice = prices.map(item => {
    return {
        ...item,
        code: generateCode(item.value),
    };
});
const dataAcreage = acreage.map(item => {
    return {
        ...item,
        code: generateCode(item.value),
    };
});

module.exports = { dataPrice, dataAcreage };
