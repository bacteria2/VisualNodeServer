let moment =require( 'moment');
let {ObjectID} =require( 'mongodb');
let {insertPreProcessor} =require( './common')
let {read} =require( 'fs');

let collection='widgets';

async function insertOneWidget(db,payload){   
    let resp= await db.collection(collection).insertOne(insertPreProcessor(payload));   
    return {number:resp.insertedCount}
}

function updateOneWiget(db,{select,setter}){ 
 return  db.collection(collection).updateOne(select,setter)
}

function getWidgetByParam(db,payload){ 
  return  db.collection(collection).find(payload);
}

function getWidgetById(db,payload){ 
  return  db.collection(collection).findOne({_id:new ObjectID(payload)});
}

module.exports={
  insertOneWidget,
  updateOneWiget,
  getWidgetByParam,
  getWidgetById
}

