'use strict';
const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectID;
const collectionName = 'prototypes';


class PrototypeService extends Service {

  async getPrototypeById(id) {
    const collection = this.app.mongo.db.collection(collectionName);
    const prototype = await collection.findOne({ _id: ObjectId(id.id) });
    return prototype;
  }

  async getPrototypes() {
    const collection = this.app.mongo.db.collection(collectionName);
    const prototypes = await collection.find().toArray();
    return prototypes;
  }

  async addPrototype(prototype) {
    const collection = this.app.mongo.db.collection(collectionName);
    const resp = await collection.insertOne(prototype);
    this.app.logger.info(`insert succeuss count:r${resp.insertedCount}`);
    return resp;
  }

  async updatePrototype(prototype) {
    const collection = this.app.mongo.db.collection(collectionName);
    const id = prototype._id;
    delete prototype._id;
    const resp = await collection.updateOne({ _id: ObjectId(id) }, { $set: prototype });
    this.app.logger.info(`update succeuss count:r${resp.modifiedCount}`);
    return resp;
  }

  async getUiMeta(id) {
    const collection = this.app.mongo.db.collection(collectionName);
    const metaDefine = await collection.find({ _id: ObjectId(id) }, { _id: 0,render:1, optionMeta: 1, dataMeta: 1 }).next();
    const { optionMeta: { normal, addable },...otherMeta } = metaDefine;
    const normalTemplate = await this.service.template.getTemplatesByNames(normal);
    const addableTemplate = await this.service.template.getTemplatesByNames(addable);
    return { optionMeta: { normal: normalTemplate, addable: addableTemplate },...otherMeta};
  }

}

module.exports = PrototypeService;

