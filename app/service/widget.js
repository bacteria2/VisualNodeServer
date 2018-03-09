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

    /* 复制实例 */
   async copyWidget(srcWidgetId,newName){
     try{
         let widget = await this.getWidget(srcWidgetId);
         delete widget._id;
         widget.name = newName;
         //处理新的实例

         //**//
         widget._id = await this.insert(widget);
         //返回新的实例
         return widget;
     }catch (e){
         throw e;
     }

   }

    async insert(widget) {
        if(!widget){
            throw new Error("保存实例失败：实例为空");
        }
        if(widget.name){
            // 判断同一个项目是否存在同名实例
            const findOne =  await this.app.mongo.db.collection('widgets').findOne({name: widget.name,projectId:widget.projectId});
            if(findOne) throw new Error('保存实例失败：存在相同的名称');
        }
        const value = await this.app.mongo.db.collection('widgets').insertOne(widget);
        const { insertedCount,insertedId } = value;
        if(insertedCount < 1)throw new Error('保存实例失败：服务器异常');
        //返回保存后的ID
        return {
            _id:insertedId.toString()
        };
    }
    /*合并原型，生成新的实例*/
    async newWidgetByPrototype(options){
        let widget = {};

        return widget
    }
}

module.exports = WidgetService;
