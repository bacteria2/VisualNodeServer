'use strict';
const dcBaseService = require('./dcBaseService');

class deployService extends dcBaseService {

    getTablename(){
        return 'YDP_VISUAL_DEPLOY';
    }

}

module.exports = deployService;
