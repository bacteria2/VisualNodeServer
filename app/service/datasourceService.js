'use strict';
const dcBaseService = require('./dcBaseService');
const ObjectID = require('mongodb').ObjectID;

class databaseService extends dcBaseService {

    constructor(props){
        super(props);
    }

    getTablename(){
        return 'YDP_VISUAL_DATASOURCE';
    }

    async typeList() {
        const dbCollection = this.app.mongo.db.collection('YDP_VISUAL_DSTYPE');
        return await dbCollection.find().toArray();
    }

}

module.exports = databaseService;
