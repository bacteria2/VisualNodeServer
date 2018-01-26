'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515641127523_735';

  // add your config here
  config.middleware = [
      'accessLog'
  ];
  config.cluster = {
    listen: {
      port: 8033,
    },
  };
  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  };
  config.static = {
    prefix: '',
  };
  config.restApi = {
    prefix: '/visual/api',
  };
  return config;
};
