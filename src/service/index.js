let requireDirectory = require('require-directory');


let include = function(path){
    return /\.service\.js$/.test(path);
  },
  rename = function(name) {
    return name.replace('.service','');
  };



module.exports = requireDirectory(module,{include,rename});