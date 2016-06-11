var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');

var sass = require('./tasks/sass');
var postcss = require('./tasks/postcss.js');
var cleanStyles = require('./tasks/clean-styles.js');
var browserify = require('./tasks/browserify.js');
var watchify = require('./tasks/watchify.js');
var vendor = require('./tasks/vendor.js');

// Nos aseguramos que NODE_ENV este definido
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Build tasks
gulp.task('sass', sass);
gulp.task('postcss', postcss.dependencies, postcss);
gulp.task('browserify', browserify);
gulp.task('watchify', watchify);
gulp.task('vendor', vendor);

//clean tasks
gulp.task('clean-styles', cleanStyles);


gulp.task('set-production', function(cb){
  process.env.NODE_ENV = 'production';
  cb();
});

gulp.task('styles', ['sass']);

gulp.task('build', [
  'browserify',
  'styles',
  'postcss',
]);

gulp.task('clean', ['clean-styles']);

// Workaround until gulp 4 is released
var runSequence = require('run-sequence');

gulp.task('deploy', function(cb){
  runSequence('set-production', 'build', cb);
});
// End workaround

// Watch task!
gulp.task('watch', [
  'vendor',
  'watchify',
  'styles',
  'postcss',
], function(){
  gulp.watch(sass.watch, ['sass'])
    .on('change', changeHandler);
  gulp.watch(postcss.watch, ['postcss'])
    .on('change', changeHandler);
  gulp.watch(vendor.watch, ['vendor'])
    .on('change', changeHandler);
});

function changeHandler(event) {
  var relPath = path.relative(path.resolve(__dirname), event.path);
  var eventColor;
  switch(event.type){
  case 'added':
    eventColor = gutil.colors.green; break;
  case 'renamed':
    eventColor = gutil.colors.cyan; break;
  case 'changed':
    eventColor = gutil.colors.yellow; break;
  case 'deleted':
    eventColor = gutil.colors.red; break;
  }
  gutil.log('File',
            gutil.colors.magenta(relPath),
            ' was',
            eventColor(event.type),
            ', running tasks...');
}
