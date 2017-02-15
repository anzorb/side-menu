var webpackRules = require('../tasks/webpack.config.common').module.rules;

//process.env.NODE_ENV = "'test'";

module.exports = function(config) {
    var configObject = {
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: '../coverage',
            includeAllSources: true,
            reporters: [{
                type: 'cobertura'
            }, {
                type: 'html'
            }, {
                type: 'text'
            }]
        },
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                rules: Object.assign({}, webpackRules, {
                        enforce: 'pre',
                        test: /(\.js|jsx)$/,
                        include: /(src)/,
                        use: 'babel-istanbul-loader'
                    }),
            },
            resolve: {
                extensions: ['.js', '.jsx']
            },
            node: {
                fs: "empty"
            }
        },
        browsers: ['jsdom'],
        singleRun: true,
        logLevel: config.LOG_INFO,

    };
    config.set(Object.assign(require('./karma.config.common.js'), configObject));
};
