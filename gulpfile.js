var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var eslint = require('gulp-eslint');

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server',]);

// Production build
gulp.task('build', ['webpack:build',]);

// Linting
gulp.task('lint', function () {
    return gulp.src('./src/js/**').pipe(eslint({
        'rules': {
            'quotes': [1, 'single',],
            'semi': [1, 'always',],
        },
    }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('webpack:build', function (callback) {
    webpack(webpackConfig).run(onBuild(callback));
    copyhtml();
    copycss();
});

gulp.task('webpack-dev-server', function (callback) {

    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'inline-source-map';
    copyhtml();
    copycss();

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/',
        stats: {
            colors: true,
        },
    }).listen(8080, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/build/index.html');
    });
});

function onBuild(callback) {
    return function (err, stats) {
        if (err) {
            gutil.log('Error', err);
            if (callback) {
                callback();
            }
        } else {
            Object.keys(stats.compilation.assets).forEach(function (key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
            gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
            if (callback) {
                callback();
            }
        }
    };
}

function copyhtml() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
}

function copycss() {
    gulp.src('src/style.css')
        .pipe(gulp.dest('build'));
}
