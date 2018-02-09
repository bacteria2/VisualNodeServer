'use strict';

const Service = require('egg').Service;
const ObjectID = require('mongodb').ObjectID;

class ProjectizedService extends Service {
  queryMyProjects(){
    //查询项目经理是当前用户或者项目成员包含当前用户的项目
    const query = {$or:[{'projectManager.userid':this.ctx.user.userid},{'members.userid':this.ctx.user.userid}]};
    const collection = this.app.mongo.db.collection('projects');
    return collection.find(query).toArray();
  }

    saveMember(_id, members) {
        return this.app.mongo.db.collection('projects').update({_id: new ObjectID(_id)}, {$set: {members: members}});
    }

    async saveProject(project) {
        let result = null, collection = this.app.mongo.db.collection('projects');
        const {_id, ...rest} = project;
        if (_id) {
            result = await collection.update({_id: new ObjectID(_id)}, rest);
            this.app.logger.info(`更新项目信息：${_id},${result.success}`);
        } else {
            result = await collection.insertOne(project) ;
            result=result.insertedId;
            this.app.logger.info('新建项目id：%j',result);

        }
        return result;
    }
}

module.exports = ProjectizedService;