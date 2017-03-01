var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
<<<<<<< HEAD
var eslint = require('gulp-eslint');
=======
>>>>>>> 4f791edda198566c6322a48f8b5b5946a627c0e5

function compile(watch) {
  var bundler = watchify(browserify('./src/js/application.js', { debug: true }).transform(babel, { "presets": ["es2015"]} ));
  
  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  function copyhtml() {
    gulp.src('src/index.html')
  		.pipe(gulp.dest('build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');      
      copyhtml();
      rebundle();
    });
  }
<<<<<<< HEAD

  // вот этот кусочек надо будет переделать
  copyhtml();
  rebundle();
}

function watch() {
  return compile(true);
};

=======

  // вот этот кусочек надо будет переделать
  copyhtml();
  rebundle();
}
>>>>>>> 4f791edda198566c6322a48f8b5b5946a627c0e5

function watch() {
  return compile(true);
};

<<<<<<< HEAD
gulp.task('lint', function() {
  return gulp.src('./src/js/**').pipe(eslint({
    'rules':{
        'quotes': [1, 'single'],
        'semi': [1, 'always']
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});


gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

=======
gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

>>>>>>> 4f791edda198566c6322a48f8b5b5946a627c0e5
gulp.task('default', ['watch']);