 'use strict';
const dcBaseService = require('./dcBaseService');

class cubeService extends dcBaseService {

    getTablename(){
        return 'YDP_VISUAL_CUBE';
    }

    async list() {
        const dbCollection = this.app.mongo.db.collection(this.tablename);
        let cubeList = await dbCollection.find({}).toArray();
        //关联查询cube的数据源 和 分类信息
        cubeList = cubeList.map(e=>{
            if(e.connType !== 'bean'){
                e.conn = this.service.datasourceService.getById(e.connId);
            }
            e.category = this.service.cubeCategoryService.getById(e.categoryId);
            return e;
        });
        return cubeList
    }

    async getDBbyCubeId(id){
        this.checkStr(id,"ID");
        const cube = await this.getById(id);
        this.checkObject(cube,'未查询到CUBE');
        const dbId = cube.connId;
        this.checkStr(dbId,'数据源ID');
        const db = await this.service.datasourceService.getById(dbId);
        this.checkObject(db,'未查询到数据源');
        return db;
    }

    async queryByCategoryId(categoryId){
        this.checkStr(categoryId,"分类ID");
        let cubeList =  await this.app.mongo.db.collection(this.tablename).find({categoryId}).toArray();
        this.checkObject(cubeList,'未查询到');
        return cubeList;
    }

}

module.exports = cubeService;
