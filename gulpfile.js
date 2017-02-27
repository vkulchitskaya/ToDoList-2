var  
    gulp = require('gulp'), // Сообственно Gulp JS
    babel = require('gulp-babel'),
    concat = require('gulp-concat');


gulp.task('build', ['babel-js', 'copy-html']);


gulp.task('babel-js', () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('copy-html', function() {
  return gulp.src('src/html/*.html')
  .pipe(gulp.dest('dist'));
});

