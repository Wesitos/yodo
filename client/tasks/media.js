var gulp = require('gulp');

var config = require('../config.json');

module.exports = function(){
  return gulp.src(config.media.src)
    .pipe(gulp.dest(config.media.build));
};

module.exports.watch = config.media.src;
