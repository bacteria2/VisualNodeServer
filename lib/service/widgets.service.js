import moment from 'moment';
import { ObjectID } from 'mongodb';
import { insertPreProcessor } from './common';

let collection = 'widgets';

export function insertOneWidget(db, payload) {
  return db.collection(collection).insertOne(insertPreProcessor(payload));
}

export function updateOneWiget(db, { select, setter }) {
  return db.collection(collection).updateOne(select, setter);
}

export function getWidgetByParam(db, payload) {
  return db.collection(collection).find(payload);
}

export function getWidgetById(db, payload) {
  return db.collection(collection).findOne({ _id: new ObjectID(payload) });
}

function deleteWidgetByParam() {}

function getWidgetList() {}