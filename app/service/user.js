'use strict';
const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;

class UserService extends Service {

  list(form){
    const {userType,name,...other} = form;
    let types = [];
    userType ? userType.forEach(t=>{types.push({userType:t})}) : null;
    let query = {...other};
    types.length > 0 ? query['$or'] = types : null;
    name ? query.name= {'$regex': name} : null;
    const collection = this.app.mongo.db.collection('user');
    return collection.find(query,{password:0}).sort({updateTime:-1}).toArray();
  }

    findUserById(userid,project={}) {
        const collection = this.app.mongo.db.collection('user');
        return collection.findOne({userid},project);
    }

    async insertOne(user) {
        const collection = this.app.mongo.db.collection('user');
        const resp = await collection.insertOne(user);
        this.app.logger.info(`insert succeuss count:r${resp.insertedCount}`);
        return resp;
    }

    async deleteOne(userid) {
        const collection = this.app.mongo.db.collection('user');
        const resp = await collection.deleteOne({userid});
        this.app.logger.info(`remove succeuss count:r${resp.deletedCount}`);
        return resp;
    }
    async save(user){
        const collection = this.app.mongo.db.collection('user');
        if(user._id){
            const _id = ObjectId(user._id);
            delete user['_id'];

            const resp = await collection.updateOne({_id:_id},{$set:user});
            this.app.logger.info(`update succeuss count:r${resp}`);
            return resp;
        }else{
            return this.insertOne(user);
        }
    }

    updateStatus({ids,status}){
        const collection = this.app.mongo.db.collection('user');
        return collection.updateMany({userid:{$in:ids}},{$set:{status}});
    }


    //校验用户名密码,以及status为1的用户
    verifyUser({username:userid,password}) {
        const collection = this.app.mongo.db.collection('user');
        this.app.logger.info('verify userid:%s',userid);
        return collection.findOne({userid,password,status:1},{ userid:1});
    }
    //获取用户登陆信息
    getUserLoginInfo(userid){
        const collection = this.app.mongo.db.collection('user');
        this.app.logger.info('get loginInfo userId:%s',userid);
        return collection.findOne({userid,status:1},{_id:0,avatar:1,notifyCount:1,name:1,userid:1,status:1,userType:1})
    }
}

module.exports = UserService;
