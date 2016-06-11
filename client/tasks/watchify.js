var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');
var merge = require('merge-stream');
var eslint = require('gulp-eslint');

var config = require("../config");
var browserifyConfig = config.browserify;
var vendorConfig = config.vendor;

var browserifyGlob = path.join(browserifyConfig.src, "**",
                               ["*", browserifyConfig.extname].join("."));
var production = process.env.NODE_ENV === 'production';

var logger = gutil.log.bind(undefined,
                            gutil.colors.cyan("watchify:"));
var options = {
  debug: !production,
  fullPaths: !production,
  cache: {},
  packageCache: {},
};

var browserifyPlugins = browserifyConfig.plugin || [];

var filesIn = glob.sync(browserifyGlob);

var bArray = filesIn.map(function(fileName){
  var b = browserify(fileName, options)
          .plugin(watchify);
  // Apply plugins
  browserifyPlugins.forEach(function(plugin){
    if (Array.isArray(plugin)){
      b.plugin(plugin[0], plugin[1]);
    }
    else{
      b.plugin(plugin);
    }
  });
  b.on('update', bundleOne.bind(undefined, b, fileName, true));
  b.on('log', logger);
  return b;
});

function bundleOne (b, fileName, updated, updatedFileList){
  if (updated){
    logger(fileName, gutil.colors.yellow("updated"));
  }
  else{
    logger(gutil.colors.yellow("watching: "), fileName);
  }
  var relativePath = path.relative(browserifyConfig.src, fileName);
  var oldExt = path.extname(relativePath);
  var newFileName = path.join(path.dirname(relativePath),
                                [path.basename(relativePath, oldExt),
                                 "js"].join("."));
  var newBundle = b.external(vendorConfig.require)
          .bundle()
          .on('error', function(err){
            logger(gutil.colors.red("Browserify Error:"),
                   "\n\t",
                   err.message,
                   "\n\t",
                   gutil.colors.cyan("in file"),
                   fileName,
                   err.stack);
          })
          .pipe(source(newFileName))
          .pipe(gulp.dest(browserifyConfig.build));
  if (updated){
    var lint = gulp.src(updatedFileList)
            .pipe(eslint())
            .pipe(eslint.format());
    return merge([lint, newBundle]);
  }
  else{
    return newBundle;
  }
}

module.exports =  function(){
  var bundles = filesIn.map(function(fileName, k){
    return bundleOne(bArray[k], fileName);
  });
  return merge(bundles);
};
