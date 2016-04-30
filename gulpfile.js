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
  , header = require('gulp-header')
  , pkg = require('./package.json')
  , fs = require('fs')
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

var banner = '/* sockjs-client v<%= pkg.version %> | http://sockjs.org | MIT license */\n';

gulp.task('test', function () {
  gulp.src('tests/node.js', {read: false})
    .pipe(mocha());
});

gulp.task('eslint', function () {
  gulp.src([
      'lib/**/*.js',
      'tests/lib/**/*.js',
      'tests/support/**/*.js',
      'tests/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function () {
  gulp.watch('tests/*.js', ['test']);
});

gulp.task('write-version', function () {
  fs.writeFileSync('./lib/version.js', "module.exports = '" + pkg.version + "';\n");
});

gulp.task('testbundle', ['browserify:min'], function() {
  return gulp.src('./build/' + libName + '.min.js')
    .pipe(rename('sockjs.js'))
    .pipe(gulp.dest('./tests/html/lib/'));
});

gulp.task('testbundle-debug', ['browserify'], function() {
  gulp.src('./build/sockjs.js')
    .pipe(rename('sockjs.js'))
    .pipe(gulp.dest('./tests/html/lib/'));

  return gulp.src('./build/sockjs.js.map')
    .pipe(rename('sockjs.js.map'))
    .pipe(gulp.dest('./tests/html/lib/'));
});

gulp.task('browserify', ['write-version'], function () {
  return browserify(util._extend({
      debug: true
    }, browserifyOptions))
    .bundle()
    .pipe(source('sockjs.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'))
    ;
});

gulp.task('browserify:min', ['write-version'], function () {
  return browserify(browserifyOptions)
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
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./build/'))
    ;
});

gulp.task('release', ['browserify', 'browserify:min'], function () {
  // sockjs-{version}.min.js
  gulp.src('./build/' + libName + '.min.js')
    .pipe(gulp.dest('./dist/'));

  // sockjs-{version}.js
  gulp.src('./build/sockjs.js')
    .pipe(rename(libName + '.js'))
    .pipe(gulp.dest('./dist/'));

  gulp.src('./build/sockjs.js.map')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('stable-release', ['release'], function () {
  // sockjs.min.js
  gulp.src('./build/' + libName + '.min.js')
    .pipe(rename('sockjs.min.js'))
    .pipe(gulp.dest('./dist/'));

  // sockjs.js
  gulp.src('./build/sockjs.js')
    .pipe(rename('sockjs.js'))
    .pipe(gulp.dest('./dist/'));
});
