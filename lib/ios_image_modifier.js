var mime = require('mime');
var fs = require('fs');
var path = require('path');
var S = require('string');

/*
 * orientation:
 * -PortraitUpsideDown
 * -LandscapeLeft
 * -LandscapeRight
 * -Portrait
 * -Landscape
 */

/*
 * scale:
 * @2x
 */

/*
 * device:
 * ~ipad
 * ~iphone
 */

var params = {
    orientation: '',
    scale: '',
    device: ''
};



/**
 * List all image jpeg/png in recursive directory
 * @return: Array
 * @params: Directory, Done
 * @access: private
 */
var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    // Only image files
                    switch ( mime.lookup(file) ){
                        case "image/png":
                            results.push(file);
                        break;

                    }

                    next();
                }
            });
        })();
    });
};

/**
 * Rename all images in recursive directory
 * @return: none - Finish message
 * @params: Directory, Done
 * @access: private
 */
module.exports.rename = function( path_dir, params ){
    function out( ph, pr ){
        walk(ph, function(err, results) {
            if (err) throw err;

            results.forEach(function( path_file ){
                var dir_name = path.dirname( path_file ) + '/';
                var ext_name = path.extname( path_file );
                var base_name = path.basename(path_file, ext_name);

                var rename_base_name = base_name;

                // Orientation
                if( !S(pr.orientation).isEmpty() ){
                    rename_base_name = rename_base_name + pr.orientation;
                }

                // Scale
                if( !S(pr.scale).isEmpty() ){
                    rename_base_name = rename_base_name + pr.scale;
                }

                // Device
                if( !S(pr.device).isEmpty() ){
                    rename_base_name = rename_base_name + pr.device;
                }


                var rename_path_file = dir_name + rename_base_name + ext_name;


                fs.rename( path_file, rename_path_file, function (err) {
                    if (err) throw err;
                    console.log(base_name + ' : ' + rename_base_name);
                });



               console.log( rename_path_file );
            });

        });

    };

    out( path_dir, params );
}