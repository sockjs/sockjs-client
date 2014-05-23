'use strict';

var gulp = require('gulp')
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , pkg = require('./package.json')
  ;

gulp.task('default', function() {

});

gulp.task('browserify', function() {
    return browserify('./lib/sockjs.js')
        .bundle({
            standalone: 'SockJS'
        })
        .pipe(source('sockjs.js'))
        .pipe(gulp.dest('./build/'));
});