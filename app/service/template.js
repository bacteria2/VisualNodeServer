'use strict';
const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectID;

class TemplateService extends Service {
  async getTemplateByName(name) {
    const collection = this.app.mongo.db.collection('template');
    const template = await collection.findOne(name);
    return template;
  }

  async getTemplates() {
    const collection = this.app.mongo.db.collection('template');
    const templates = await collection.find().toArray();
    return templates;
  }

  async addTemplate(template) {
    const collection = this.app.mongo.db.collection('template');
    const resp = await collection.insertOne(template);
    this.app.logger.info(`insert succeuss count:r${resp.insertedCount}`);
    return resp;
  }

  async updateTemplate(template) {
    const collection = this.app.mongo.db.collection('template');
    const id = template._id;
    delete template._id;
    const t = await collection.updateOne({ _id: ObjectId(id) }, { $set: template });
    this.app.logger.info(`update succeuss count:r${t.modifiedCount}`);
    return t;
  }

}

module.exports = TemplateService;
