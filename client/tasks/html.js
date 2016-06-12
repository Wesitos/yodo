var gulp = require('gulp');

var config = require('../config.json');

module.exports = function(){
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.build));
};

module.exports.watch = config.html.src;
