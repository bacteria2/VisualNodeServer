'use strict';

// had enabled by egg
// exports.static = true;
exports.mongo = {
  enable: true,
  package: 'egg-mongo-native',
};

exports.passport = {
    enable: true,
    package: 'egg-passport',
};