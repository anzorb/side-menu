const config = require('./config.js');
const path = require('path');

module.exports = {
    module: {
        rules: [{
            test: /(\.js|jsx)$/,
            enforce: 'pre',
            include: /(src)/,
            use: ['eslint-loader'],
        }, {
            test: /\.(js|jsx)$/,
            include: /(src)/,
            use: 'babel-loader',
        }, {
            test: /\.(png|jpg)$/,
            include: /(src)/,
            use: {
                loader: 'url',
                query: {
                    limit: 5000000
                }
            }
        }, {
            test: /\.scss$/,
            include: /(src)/,
            use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
