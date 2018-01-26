'use strict';
const dcBaseService = require('./dcBaseService');

class cubeCategoryService extends dcBaseService {

    getTablename(){
        return 'YDP_VISUAL_CUBE_CATEGORY';
    }

}

module.exports = cubeCategoryService;
