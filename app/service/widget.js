'use strict';

const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
const { deployWidget }=require('../utils/deploy');

class WidgetService extends Service {
    async getWidget(widgetId) {
        return await this.app.mongo.db.collection('widgets').findOne({_id: ObjectId(widgetId)}, {_id: 0});
    }

    getWidgetList(queryObject = {}, skip = 0, limit = 20) {
        const collection = this.app.mongo.db.collection('widgets');
        return collection.find(queryObject, {
            sort: {updateTime: -1},
            skip,
            limit
        }).project({_id: 1, updateTime: 1, description: 1, name: 1}).toArray()
            ;
    }

    async getPropertyPage(pageName) {
        return await this.service.template.getTemplateByName({name: pageName});
    }

    async deployWidgetToDb(requestBody, type) {
        const {idList = [], dbOption} = requestBody;
        const query = [
            {$match: {_id: {$in: idList.map(id => ObjectId(id))}}},
            {
                $lookup: {
                    from: "prototypes",
                    localField: 'prototypeId',
                    foreignField: "_id",
                    as: "prototypesDoc"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {$arrayElemAt: ["$prototypesDoc", 0]}, "$$ROOT"
                        ]
                    }
                }
            },
            {
                $project: {
                    render: 1,
                    script: 1,
                    rawOption: 1,
                    data: 1,
                    dataOption: 1,
                    name: 1
                }
            }
        ];
        //查找所有的例子
        const result = await this.app.mongo.db.collection('widgets').aggregate(query).toArray();
        const widgetLists = result.map(({_id, render, script, ...other}) => ({
            _id: _id.toString(),
            script: script + ";" + render, ...other
        }));
        return deployWidget(type, widgetLists, dbOption, this.app.logger);
    }
}

module.exports = WidgetService;
