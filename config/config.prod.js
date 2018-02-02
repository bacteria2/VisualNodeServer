'use strict';
const path = require('path');

exports.mongo =app=>( {
  client: {
    host: '192.168.40.161',
    port: '27017',
    name: 'data-view',
  },
  logger: {
    level: 'INFO',
    consoleLevel: 'NONE',
    dir: path.join(appInfo.baseDir, 'logs'),
  },
});
