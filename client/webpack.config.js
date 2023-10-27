// webpack.config.js
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
module.exports = {
    plugins: [
        // Hoặc bỏ hết tất cả chỉ chừa lại 'en' và 'vi'
        // Bạn không thể bỏ 'en' vì đó là mặc định của moment.js
        new MomentLocalesPlugin({
            localesToKeep: ['vi'],
        }),
    ],
};
