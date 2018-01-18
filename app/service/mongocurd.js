'use strict';
const Service = require('egg').Service;

class MongoCurdService extends Service {
  async listUser() {
    const userCollection = this.app.mongo.db.collection('users');
    return await userCollection.find({}).toArray();
  }

  async insertBatch(users) {
    const value = await this.app.mongo.db.collection('users').insertMany(users);
    const { insertedCount } = value;
    return insertedCount;
  }

  async delete(query) {
    const value = await this.app.mongo.db.collection('users').deleteMany(query);
    return value.deletedCount;
  }

  async update(query, user) {
    const value = await this.app.mongo.db.collection('users').updateMany(query, user);
    const { result: { n } } = value;
    return n;
  }
}

module.exports = MongoCurdService;
