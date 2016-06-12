var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

var config = require('../config.json');
var production = process.env.NODE_ENV === 'production';

module.exports = function () {
	return gulp.src(config.js.src)
		.pipe(production?gutil.noop():sourcemaps.init())
    .pipe(plumber())
		.pipe(babel({plugins: config.js.plugin || []}))
    .pipe(plumber.stop())
		.pipe(production?gutil.noop():sourcemaps.write())
		.pipe(gulp.dest(config.js.build));
};

module.exports.watch = config.js.src;
