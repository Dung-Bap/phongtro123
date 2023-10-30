const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { hashPassword } = require('../ultils/helpers');

const register = asyncHandler(async (req, res) => {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) throw new Error('Missing Inputs');
    const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
            id: v4(),
            phone,
            name,
            password: hashPassword(password),
        },
    });
    const token =
        response[1] &&
        jwt.sign({ id: response[0].dataValues.id, phone: response[0].dataValues.phone }, process.env.JWT_SECRET, {
            expiresIn: '2d',
        });
    return res.status(200).json({
        success: response[1] ? true : false,
        message: response[1] ? 'Register Successfully !!!' : 'Phone number has been aldready used !',
        token: token || null,
    });
});

const login = asyncHandler(async (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) throw new Error('Missing Inputs');
    const response = await db.User.findOne({ where: { phone }, raw: true });
    const isCorrectPassword = response && bcrypt.compareSync(password, response.password);
    const token =
        isCorrectPassword &&
        jwt.sign({ id: response.id, phone: response.phone }, process.env.JWT_SECRET, {
            expiresIn: '2d',
        });
    return res.status(200).json({
        success: token ? true : false,
        result: token ? 'Login Successfully !!!' : response ? 'Wrong Password !' : 'Phone number not found',
        token: token || null,
    });
});

const getCurrent = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const user = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
            exclude: ['password'],
        },
    });
    return res.status(200).json({
        success: user ? true : false,
        user: user ? user : 'User Not Found',
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const { phone, name, zalo, fbUrl } = req.body;
    if (!(phone || name || zalo || fbUrl)) throw new Error('Missing inputs');
    const data = { phone, name, zalo, fbUrl };
    if (req.file) data.avatar = req.file.path;
    const { id } = req.user;
    const response = await db.User.update(data, {
        where: {
            id,
        },
    });
    res.status(200).json({
        success: response ? true : false,
        message: response ? 'Cập nhật thông tin thành công !' : 'Có gì đó sai sai !',
    });
});

module.exports = {
    register,
    login,
    getCurrent,
    updateUser,
};
