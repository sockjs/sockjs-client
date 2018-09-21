/* eslint camelcase: "off" */
'use strict';

var gulp = require('gulp')
  , browserify = require('browserify')
  , uglify = require('gulp-uglify')
  , sourcemaps = require('gulp-sourcemaps')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , envify = require('envify/custom')
  , rename = require('gulp-rename')
  , header = require('gulp-header')
  , replace = require('gulp-replace')
  , pkg = require('./package.json')
  , fs = require('fs')
  , pump = require('pump')
  ;

var browserifyOptions = {
      entries: './lib/entry.js'
    , standalone: 'SockJS'
    , debug: true
    , insertGlobalVars: {
        process: function () {
          return '{ env: {} }';
        }
      }
    }
  ;

var banner = '/* sockjs-client v<%= pkg.version %> | http://sockjs.org | MIT license */\n';

gulp.task('write-version', function (cb) {
  fs.writeFile('./lib/version.js', "module.exports = '" + pkg.version + "';\n", cb);
});

gulp.task('browserify', gulp.series('write-version', function (cb) {
  pump([
    browserify(browserifyOptions).bundle(),
    source('sockjs.js'),
    buffer(),
    sourcemaps.init({ loadMaps: true }),
    header(banner, { pkg: pkg }),
    sourcemaps.write('./'),
    gulp.dest('./build/')
  ], cb);
}));

gulp.task('browserify:min', gulp.series('write-version', function (cb) {
  pump([
    browserify(browserifyOptions).exclude('debug').transform(envify({ NODE_ENV: 'production' })).bundle(),
    source('sockjs.min.js'),
    buffer(),
    sourcemaps.init({ loadMaps: true }),
    uglify({ compress: { pure_funcs: ['debug'] }, output: { beautify: false, keep_quoted_props: true } }),
    header(banner, { pkg: pkg }),
    sourcemaps.write('./'),
    gulp.dest('./build/')
  ], cb);
}));

gulp.task('testbundle', gulp.series('browserify:min', 
  gulp.parallel(function() {
    return gulp.src('./build/sockjs.min.js')
      .pipe(rename('sockjs.js'))
      .pipe(replace('sourceMappingURL=sockjs.min.js.map', 'sourceMappingURL=sockjs.js.map'))
      .pipe(gulp.dest('./tests/html/lib/'));
  }, function() {
    return gulp.src('./build/sockjs.min.js.map')
      .pipe(rename('sockjs.js.map'))
      .pipe(gulp.dest('./tests/html/lib/'));
  })
));

gulp.task('testbundle-debug', gulp.series('browserify',
  gulp.parallel(function() {
    return gulp.src('./build/sockjs.js')
      .pipe(rename('sockjs.js'))
      .pipe(gulp.dest('./tests/html/lib/'));
  }, function() {
    return gulp.src('./build/sockjs.js.map')
      .pipe(rename('sockjs.js.map'))
      .pipe(gulp.dest('./tests/html/lib/'));
  })
));

gulp.task('release', gulp.series('browserify', 'browserify:min', gulp.parallel(
  function () { return gulp.src('./build/sockjs.js').pipe(gulp.dest('./dist/')); },
  function () { return gulp.src('./build/sockjs.js.map').pipe(gulp.dest('./dist/')); },
  function () { return gulp.src('./build/sockjs.min.js').pipe(gulp.dest('./dist/')); },
  function () { return gulp.src('./build/sockjs.min.js.map').pipe(gulp.dest('./dist/')); }
)));
