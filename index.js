// index.js file
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');
var through = require("through2");

var PLUGIN_NAME = 'gulp-css-image-cache-burst';

module.exports = function (options) {
    return through.obj(function (file, encoding, callback) {

        options = options || {};
        var self = this;
        var parameterName = options.name || 'v';
        var parameterValue = options.value || new Date().valueOf();

        if (file.isNull()) {
            // nothing to do
            self.push(file);
            return callback();
        }

        if (file.isStream()) {
            self.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }

        var fileName = file.path.split(path.sep).pop();

        // check if it is CSS file
        if (!/^\.css?$/.test(path.extname(file.path))) {
            gutil.log(gutil.colors.red('[WARN] file ' + fileName + ' is not a css file'));
            this.push(file);
            return callback();
        }

        var cssFileContent = file.contents.toString();

        var urlRegex = /url\("?([^\)"]+)"?\)/g;
        // The format of a URI value is 'url(' followed by optional white space followed by an optional single quote (') 
        // or double quote (") character followed by the URI itself, followed by an optional single quote (') or double quote (") character 
        // followed by optional white space followed by ')'. The two quote characters must be the same.
        // https://www.w3.org/TR/CSS2/syndata.html#uri
        cssFileContent = cssFileContent.replace(urlRegex, function (str, url) {

            var queryParam = url.split('?');
            // remove white space
            url = url.replace(/\?[\s\S]*$/, "").trim();
            // remove single or double quote
            url = url.replace(/['"]*/g, "");

            if (url.indexOf("base64,") > -1 || url.indexOf("about:blank") > -1 || url.indexOf("http://") > -1 || url === '/') {
                return str;
            }
            var queryString  = queryParam.length <2                ?
                               "?" + parameterName + "=" + parameterValue :
                               "?" + queryParam[1] + '&' + parameterName + "=" + parameterValue ;
            return "url(" + url + queryString +")";

        });


        file.contents = new Buffer(cssFileContent);
        self.push(file);
        callback();
    });
};