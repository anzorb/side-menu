const webpack = require('webpack');
const baseConfig = require('./webpack.config.common.js');
const config = require('./config.js');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

process.env.BABEL_ENV = 'dev';

module.exports = Object.assign(baseConfig, {
    devtool: 'source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [precss, autoprefixer] } }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ],
    entry: config.entryPointDev,
    devServer: {
        contentBase: './demo',
        //hot: true,
        publicPath: '/dist/',
        host: '0.0.0.0',
    },
    output: {
        path: config.dist,
        library: config.appName,
        filename: path.join(config.outputName + '.js')
    }
});
