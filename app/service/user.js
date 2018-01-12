'use strict';
const Service = require('egg').Service;

class UserService extends Service {

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
}

module.exports = UserService;
