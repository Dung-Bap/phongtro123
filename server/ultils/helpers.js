const bcrypt = require('bcrypt');

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const generateCode = value => {
    let output = '';
    value = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('');

    let merge = value + process.env.CODE_SECRET;
    let length = merge.length;
    for (let i = 0; i < 3; i++) {
        let index = i === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2);
        output += merge.charAt(index);
        length = index;
    }
    return `${value.charAt(2)}${output}`.toUpperCase(); // để chartAt 0 với 1 thì bị trùng :))
};

const convertStringToNumberAcreage = string => {
    return Math.ceil(string.match(/\d+/)[0]);
};
const convertStringToNumberPrice = string => {
    if (string.search('đồng/tháng') !== -1) return Math.ceil(parseFloat(string.replace(/[^\d\.]*/g, ''))) / 1000;
    return Math.ceil(parseFloat(string.replace(/[^\d\.]*/g, '')));
};

const convertNumberToString = number => {
    if (Number(number) === number && number % 1 === 0) return `${number} triệu/tháng`;
    if (Number(number) === number && number % 1 !== 0 && number < 1) {
        return `${number * Math.pow(10, 6)} đồng/tháng`;
    } else {
        return `${number} triệu/tháng`;
    }
};

const formatCreateTime = () => {
    const day = new Date();
    const dayCurrent = day.getDay() === 0 ? 'Chủ Nhật' : `Thứ ${day.getDay() + 1}`;
    const time = `${day.getHours()}:${(day.getMinutes() < 10 ? '0' : '') + day.getMinutes()}`;
    const fullDay = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;

    return `${dayCurrent}, ${time} ${fullDay}`;
};

module.exports = {
    hashPassword,
    generateCode,
    convertStringToNumberAcreage,
    convertStringToNumberPrice,
    convertNumberToString,
    formatCreateTime,
};
