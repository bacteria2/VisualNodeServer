let requireDirectory = require('require-directory');


let include = function(path){
    return /\.route\.js$/.test(path);
  },
  rename = function(name) {
    return name.replace('.route','');
  };



module.exports = requireDirectory(module,{include,rename});
