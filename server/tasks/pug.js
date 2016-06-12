var gulp = require('gulp');

var config = require('../config.json');

module.exports = function(){
  return gulp.src(config.pug.src)
    .pipe(gulp.dest(config.pug.build));
};

module.exports.watch = config.pug.src;
