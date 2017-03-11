## gulp-css-image-cache-burst

a plugin for gulp.js to add cache burst parameter in URL for images in css file;


## Options

name :name of cache burst parameter name 
      default value 'v'

```js
var imageCacheBurst = require('gulp-css-image-cache-burst');

gulp.task('add-cache-burst', function() {
    gulp.src('css/*.css')
        .pipe(imageCacheBurst({name:'version'}))
        .pipe(gulp.dest('dist'))
});
```

value :value of cache burst parameter name 
       default value is current time value (https://www.w3schools.com/jsref/jsref_valueof_date.asp)

```js
var imageCacheBurst = require('gulp-css-image-cache-burst');

gulp.task('add-cache-burst', function() {
    gulp.src('css/*.css')
        .pipe(imageCacheBurst({
            value: '12345'
        }))
        .pipe(gulp.dest('dist'))
});
```