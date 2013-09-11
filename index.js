module.exports = process.env.IIM_COV
    ? require('./lib-cov/ios-image-modifier')
    : require('./lib/ios-image-modifier');