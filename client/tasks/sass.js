var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var production = process.env.NODE_ENV === 'production';
var stylesConf = require('../config.json').styles;
var sassGlob = path.join(stylesConf.sass.src, '**',
                         ['*.', stylesConf.sass.extname].join(''));

var sassOpts = {
  includePaths: stylesConf.sass.includePaths || [],
};

module.exports = function(){
  return gulp.src(sassGlob)
    .pipe(production?gutil.noop():sourcemaps.init()) // Sourcemaps
  // Sass
    .pipe(sass(sassOpts)
          .on('error', sass.logError))
  //
    .pipe(production?gutil.noop():sourcemaps.write()) // Sourcemaps
    .pipe(gulp.dest(stylesConf.build));
};

module.exports.watch = sassGlob;
