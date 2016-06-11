var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var browserify = require('browserify');
var Path = require('path');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var config = require('../config.json');
var appConfig = config.browserify;
var vendor = config.vendorConfig;

var browserifyGlob = Path.join(appConfig.src, "**",
                               ["*", appConfig.extname].join("."));

module.exports = function (){
  return gulp.src(browserifyGlob)
    .pipe(plumber())
    .pipe(through.obj(function( file, enc, cb) {
      browserify(file.path)
        .external(vendorConfig.require)
        .bundle(function(err, res){
          gutil.log('browserify', file.relative);
          if(file.isBuffer() && res)
            file.contents = res;
          else
            file.contents = null;
          cb(null, file);
        })
        .on('error', function(err){
          gutil.log(
            gutil.colors.red("Browserify compile error:"),
            err.message,
            "\n\t",
            gutil.colors.cyan("in file"),
            file.path,
            err.stack);
          this.emit("end");
        });
    }))
    .on('error', function(err){
      console.log(err.stack);
      this.emit("end");
    })
    .pipe(rename({extname: ".js"}))
    .pipe(gulp.dest(appConfig.build))
    .pipe(uglify())
    .pipe(rename({suffix:"-min"}))
    .pipe(gulp.dest(appConfig.build))
    .on('error', gutil.log);
};
