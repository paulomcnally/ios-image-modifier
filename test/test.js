var iim = require('../lib/ios_image_modifier');

var params = {};
params.scale = "@2x";
params.orientation = "-Landscape";
params.device = '~ipad';

iim.rename( '/Users/paulomcnally/Documents/bitbucket/iosProject/Resources/img', params );
