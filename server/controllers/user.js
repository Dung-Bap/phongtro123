const asyncHandler = require('express-async-handler');
const db = require('../models');
const makeId = require('uniqid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) throw new Error('Missing Inputs');
    const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
            id: makeId,
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

module.exports = {
    register,
    login,
};
