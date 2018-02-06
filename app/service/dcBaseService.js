'use strict';
const Service = require('egg').Service;
const ObjectID = require('mongodb').ObjectID;

class dcBaseService extends Service {

    constructor(props){
        super(props);
        this.tablename = this.getTablename();
    }

    getTablename(){ //重写这个方法，返回自己的表名
        // return 'YDP_VISUAL_DATASOURCE';
    }

    checkStr(str,fieldName){
        if(!str || str === 'undefined' || str==='null' || typeof str !== 'string'){
            throw new Error(fieldName + "不能为空");
        }
        if( typeof str !== 'string') {
            throw new Error(fieldName + "数据类型错误" + typeof(str));
        }
    };

    checkObject(Object,msg){
        if(!Object){
            throw new Error(msg?msg:"数据不能为空");
        }
    };

    async list() {
        const dbCollection = this.app.mongo.db.collection(this.tablename);
        return await dbCollection.find({}).toArray();
    }

    async getById(id) {
        this.checkStr(id,'ID');
        return await this.app.mongo.db.collection(this.tablename).findOne({_id:new ObjectID(id)});
    }

    async insert(db) {
        this.checkObject(db,"保存数据不能为空");
        if(db.name){
            const findOne =  await this.queryByOptions({name:db.name});
            if(findOne) throw new Error('添加失败：存在相同的名称');
        }
        const value = await this.app.mongo.db.collection(this.tablename).insertOne(db);
        const { insertedCount,insertedId } = value;
        if(insertedCount < 1)throw new Error('添加失败：服务器异常');
        return {
            _id:insertedId.toString()
        };
    }

    async deleteById(id) {
        this.checkStr(id,'ID');
        const value = await this.app.mongo.db.collection(this.tablename).deleteOne({_id:new ObjectID(id)});
        return value.deletedCount;
    }

    async queryByOptions(options) {
        return await this.app.mongo.db.collection(this.tablename).findOne(options);
    }

    async update(options) {
        this.checkObject(options,"更新数据不能为空");
        const id = options._id;
        this.checkStr(id,"ID");
        delete options._id;
        //判断你是否同名
        if(options.name) {
            const findOne = await this.queryByOptions({ _id: { $ne: new ObjectID(id) }, name: options.name });
            if (findOne) throw new Error('添加失败：存在相同的名称');
        }
        const value = await this.app.mongo.db.collection(this.tablename).updateOne({_id:new ObjectID(id)}, {$set:options});
        const { result:{ok} } = value;
        return ok;
    }
}

module.exports = dcBaseService;
