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
    return `${value.charAt(0)}${output}`.toUpperCase();
};

module.exports = { hashPassword, generateCode };
