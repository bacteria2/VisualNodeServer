'use strict';

const dcBaseController = require('./dcBaseController.js');

class cube extends dcBaseController {

    getService(){
        return this.service.cubeService;
    }

    async getDBbyCubeId(){
        try{
            const result = await this.myService.getDBbyCubeId(this.ctx.params.id);
            this.success(result);
        }catch (e){
            this.error(null,e.message);
            this.logger.error(e);
        }
    }

    async queryByCategoryId(){
        try{
            const result = await this.myService.queryByCategoryId(this.ctx.params.id);
            this.success(result);
        }catch (e){
            this.error(null,e.message);
            this.logger.error(e);
        }
    }

}

module.exports = cube;
