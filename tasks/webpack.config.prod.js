const webpack = require('webpack');
const config = require('./config.js');
const path = require('path');
const baseConfig = require('./webpack.config.common.js');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

process.env.BABEL_ENV = 'prod';

module.exports = Object.assign(baseConfig, {
    devtool: 'source-map',
    entry: config.entryPoint,
    output: {
        path: config.dist,
        libraryTarget: 'umd',
        library: config.appName,
        filename: path.join(config.outputName + '.min.js'),
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [precss, autoprefixer] } }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        })
    ]
});
