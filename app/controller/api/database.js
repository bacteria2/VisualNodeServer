'use strict';

const dcBaseController = require('./dcBaseController.js');

class DatabaseController extends dcBaseController {

    constructor(props){
        super(props);
    }

    getService(){
        return this.service.datasourceService;
    }

    //获取数据库类型
    async typeList() {
        try{
            const result = await this.myService.typeList();
            this.success(result);
        }catch (e){
            this.error(null,e.message);
            console.log(e.stack);
        }
    }

}

module.exports = DatabaseController;
