var _ = require('lodash');

module.exports = function(config) {
    var configObject = {
        reporters: ['progress'],
        singleRun: false,
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: require('../tasks/webpack.config.common').module,
            resolve: {
                extensions: ['.js', '.jsx']
            }
        },
        logLevel: config.LOG_INFO
    };
    config.set(_.extend(configObject, require('./karma.config.common.js')));
};
