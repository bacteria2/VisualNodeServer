'use strict';

const BaseController = require('../base');

/**
 * 增删改查
 */
class DatabaseController extends BaseController {

    constructor(props){
        super(props);
        this.myService = this.getService();
        this.body = this.ctx.request.body;
    }

    getService(){//实现这个方法，返回自己的Service
        // return this.service.datasourceService;
    }

    async list() {
        try{
            const result = await this.myService.list();
            this.success(result);
        }catch (e){
            this.error(null,e.message);
            console.log(e.stack);
        }
    }

    async getById() {
        try{
            const result = await this.myService.getById(this.ctx.params.id);
            this.success(result);
        }catch (e){
            this.error(null,e.message);
            console.log(e.stack);
        }
    }

    async insert() {
        //判断是否存在相同的名称
        try{
            const result = await this.myService.insert(this.body);
            this.success(result,'添加成功');
        }catch (e){
            this.error(null,e.message);
            console.log(e.stack);
        }

    }

    async deleteById() {
        try{
            const result = await this.myService.deleteById(this.ctx.params.id);
            this.success(result,'删除成功');
        }catch (e){
            this.error(null,e.message);
            console.log(e.stack);
        }
    }

    async update() {
        try{
            const result = await this.myService.update(this.body);
            this.success(result,'修改成功');
        }catch (e){
            this.error(null,e.message);
            console.log(e.stack);
        }
    }
}

module.exports = DatabaseController;
