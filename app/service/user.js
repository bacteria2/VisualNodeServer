'use strict';
const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;

class UserService extends Service {

  async list(query){
    const collection = this.app.mongo.db.collection('user');
    const users = await collection.find(query,{password:0}).sort({updateTime:1}).toArray();
    return users;
  }

  async findUserById(userid) {
    const collection = this.app.mongo.db.collection('user');
    const user = await collection.findOne({ userid });
    return user;
  }

  async insertOne(user) {
    const collection = this.app.mongo.db.collection('user');
    const resp = await collection.insertOne(user);
    this.app.logger.info(`insert succeuss count:r${resp.insertedCount}`);
    return resp;
  }

  async deleteOne(userid) {
    const collection = this.app.mongo.db.collection('user');
    const resp = await collection.deleteOne({ userid });
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
      const resp = await this.insertOne(user);
      return resp;
    }
  }

  async updateStatus({ids,status}){
    const collection = this.app.mongo.db.collection('user');
    const resp = await collection.updateMany({userid:{$in:ids}},{$set:{status}});
    return resp;
  }
}

module.exports = UserService;
