var del = require('del');
var stylesConf = require('../config.json').styles;

module.exports = function(){
  return del(stylesConf.build);
};
