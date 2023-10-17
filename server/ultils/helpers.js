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

module.exports = { hashPassword, generateCode, convertStringToNumberAcreage, convertStringToNumberPrice };
