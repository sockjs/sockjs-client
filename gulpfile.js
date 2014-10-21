/* eslint camelcase: 0 */
'use strict';

var util = require('util')
  , gulp = require('gulp')
  , browserify = require('browserify')
  , uglify = require('gulp-uglify')
  , sourcemaps = require('gulp-sourcemaps')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , envify = require('envify/custom')
  , mocha = require('gulp-mocha')
  , eslint = require('gulp-eslint')
  , rename = require('gulp-rename')
  , pkg = require('./package.json')
  ;

var libName = 'sockjs-' + pkg.version
  , browserifyOptions = {
      entries: './lib/entry.js'
    , standalone: 'SockJS'
    , insertGlobalVars: {
        process: function () {
          return '{ env: {} }';
        }
      }
    }
  ;

gulp.task('test', function () {
  gulp.src('tests/node.js', {read: false})
    .pipe(mocha());
});

gulp.task('eslint', function () {
  gulp.src(['lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function () {
  gulp.watch('tests/*.js', ['test']);
});

gulp.task('testbundle', ['browserify:min'], function() {
  return gulp.src('./build/' + libName + '.min.js')
    .pipe(rename('sockjs.js'))
    .pipe(gulp.dest('./tests/html/lib/'));
});

gulp.task('browserify', function () {
  return browserify(util._extend({
      debug: true
    }, browserifyOptions))
    .ignore('querystring')
    .bundle()
    .pipe(source('sockjs.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'))
    ;
});

gulp.task('browserify:min', function () {
  return browserify(browserifyOptions)
    .ignore('querystring')
    .exclude('debug')
    .transform(envify({
      NODE_ENV: 'production'
    }))
    .bundle()
    .pipe(source(libName + '.min.js'))
    .pipe(buffer())
    .pipe(uglify({
      compress: {
        // remove debug statements from output entirely
        pure_funcs: ['debug']
      }
    }))
    .pipe(gulp.dest('./build/'))
    ;
});
