'use strict';
const Service = require('egg').Service;

class AuthorizationService  extends Service{

    getAuthList(){
        const collection = this.app.mongo.db.collection('authorization');
        return collection.find({}).project({_id:0}).toArray();
    }

}

module.exports = AuthorizationService;
