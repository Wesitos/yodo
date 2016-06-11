var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var path = require('path');

var stylesConf = require('../config.json').styles;
var cssGlob = path.join(stylesConf.build, '**', ['*.', 'css'].join(''));

var production = process.env.NODE_ENV === 'production';

var processors = [
  autoprefixer(),
];

if (production){
  // Minimizar
  processors.push(cssnano());
}

module.exports = function(){
  return gulp.src(cssGlob)
    .pipe(postcss(processors))
    .pipe(gulp.dest(stylesConf.build));
};

module.exports.dependencies = ['styles'];
module.exports.watch = cssGlob;
