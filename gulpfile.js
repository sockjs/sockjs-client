'use strict';

var gulp = require('gulp')
  , browserify = require('browserify')
  , exorcist = require('exorcist')
  , mold = require('mold-source-map')
  , source = require('vinyl-source-stream')
  , path = require('path')
  , jsRoot = path.join(__dirname, 'lib')
  , pkg = require('./package.json')
  , libName = 'sockjs-' + pkg.version
  ;

gulp.task('test', function() {
  browserify('./lib/sockjs.js')
    .bundle({
      standalone: 'SockJS'
    , debug: true
    })
    .pipe(mold.transformSourcesRelativeTo(jsRoot))
    .pipe(exorcist(path.join(__dirname, 'tests/html/lib/sockjs.js.map')))
    .pipe(source('sockjs.js'))
    .pipe(gulp.dest('./tests/html/lib/'))
    ;

  return browserify('./tests/html/lib/alltests.js')
    .bundle()
    .pipe(source('alltestsbundle.js'))
    .pipe(gulp.dest('./tests/html/lib/'))
    ;
});

gulp.task('browserify', function () {
  return browserify('./lib/sockjs.js')
    .bundle({
      standalone: 'SockJS'
    , debug: true
    })
    .pipe(mold.transformSourcesRelativeTo(jsRoot))
    .pipe(exorcist(path.join(__dirname, 'build/sockjs.js.map')))
    .pipe(source('sockjs.js'))
    .pipe(gulp.dest('./build/'))
    ;
});

gulp.task('browserify:min', function () {
  return browserify('./lib/sockjs.js')
    .plugin('minifyify', {
      map: libName + '.min.js.map'
    , compressPath: jsRoot
    , output: './build/'+ libName + '.min.js.map'
    })
    .bundle({
      standalone: 'SockJS'
    })
    .pipe(source(libName + '.min.js'))
    .pipe(gulp.dest('./build/'))
    ;
});