process.env.BABEL_ENV = 'karma';
var path = require('path');

module.exports = {
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
        'karma-jasmine',
        'karma-webpack',
        'karma-coverage',
        'karma-chrome-launcher',
        'karma-sourcemap-loader',
        'karma-jsdom-launcher'
    ],
    files: [
        './tests.bundle.js'
    ],
    exclude: [],
    preprocessors: {
        './tests.bundle.js': ['webpack', 'sourcemap'],
    },
    browsers: ['Chrome', 'Chrome_without_security'],
    customLaunchers: {
        Chrome_without_security: {
            base: 'Chrome',
            flags: ['--disable-web-security']
        }
    },
    port: 9876,
    colors: true,
    browsers: ['Chrome']
};