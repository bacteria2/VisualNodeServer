'use strict';

const Service = require('egg').Service;
const ObjectID = require('mongodb').ObjectID;

class ProjectizedService extends Service {
  async queryMyProjects(){
    //查询项目经理是当前用户或者项目成员包含当前用户的项目
    const query = {$or:[{'projectManager.userid':this.ctx.user.userid},{'members.userid':this.ctx.user.userid}]};
    const collection = this.app.mongo.db.collection('projects');
    const projects = await collection.find(query).toArray();
    return projects;
  }

  async saveMember(_id,members){
    const result = await this.app.mongo.db.collection('projects').update({_id: new ObjectID(_id)},{$set:{members: members}});
    console.log(result);
    return result;
  }

  async saveProject(project){
    let result = null;
    if(project && project.prjId){
      const id = project.prjId;
      delete project['prjId'];
      result = await this.app.mongo.db.collection('projects').update({_id: new ObjectID(id)},project);
      this.app.logger.info(`更新项目信息：${id},${result.success}`);
    }else{
      result = await this.app.mongo.db.collection('projects').insert(project);
      this.app.logger.info(`新建项目信息：${result.success}`);
    }
    return result;
  }
}

module.exports = ProjectizedService;