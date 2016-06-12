var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');

var babel = require('./tasks/babel.js');
var pug = require('./tasks/pug.js');

// Nos aseguramos que NODE_ENV este definido
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Build tasks
gulp.task('pug', pug);
gulp.task('babel', babel);

gulp.task('set-production', function(cb){
  process.env.NODE_ENV = 'production';
  cb();
});

gulp.task('build', [
  'babel',
  'pug',
]);

// Workaround until gulp 4 is released
var runSequence = require('run-sequence');

gulp.task('deploy', function(cb){
  runSequence('set-production', 'build', cb);
});
// End workaround

// Watch task!
gulp.task('watch', [
  'babel',
  'pug',
], function(){
  gulp.watch(babel.watch, ['babel'])
    .on('change', changeHandler);
  gulp.watch(pug.watch, ['pug'])
    .on('change', changeHandler);
});

function changeHandler(event) {
  console.log("event");
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
