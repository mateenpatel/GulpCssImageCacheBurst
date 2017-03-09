// index.js file
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'gulp-css-image-cache-burst';

module.exports = function (options) {
    return through.obj(function (file, encoding, callback) {

        options = options || {};
        var self = this;

        if (file.isNull()) {
            // nothing to do
            self.push(file);
            return callback(null, file);
        }

        if (file.isStream()) {
            self.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback(null, file);
        } else if (file.isBuffer()) {
            self.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
            return callback(null, file);
        }

        // check if it is CSS file
        if (!/^\.css?$/.test(path.extname(file.path))) {
            gutil.log(gutil.colors.red('[WARN] file ' + fileName + ' is not a css file'));
            this.push(file);
            return callback(null, file);
        }
    });
};