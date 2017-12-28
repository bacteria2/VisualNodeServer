import {
    MongoClient
} from 'mongodb';
import {
    mongodbUrl,
    connectConfig,
    dbName
} from '../../src/config';



let user = {
        name: 'redmine2',
        age: 80,
        te: "8312"
    },
    collection = 'test',
    updateAge = 20,
    db = null,
    client = null;

beforeAll(() => MongoClient.connect(mongodbUrl, connectConfig).then(
    clt =>{        
        client = clt;
        db = client.db(dbName);
    }))

afterAll(_ => client.close())

test('插入用户', done => {
    expect(db).not.toEqual(null)
    db.collection(collection).insertOne(user, function (err, db) {
        expect(err).toEqual(null);
        expect(db.insertedCount).toEqual(1)
        done()
    })
})

test('获取插入的用户', done => {
    expect(db).not.toEqual(null)
    db.collection(collection).findOne({
        name: user.name
    }, function (err, result) {
        expect(err).toEqual(null);
        expect(result).not.toEqual(null);
        expect(result.name).toEqual(user.name);
        done()
    })
})

test('更新用户', done => {
    expect(db).not.toEqual(null)
    db.collection(collection).updateOne({
        name: user.name
    }, {
        $set: {
            age: updateAge
        }
    }, function (err, result) {
        expect(err).toEqual(null);
        expect(result).not.toEqual(null);
        expect(result.modifiedCount).toEqual(1);
        done()
    })
})

test('获取更新的用户', done => {
    expect(db).not.toEqual(null)
    db.collection(collection).findOne({
        name: user.name
    }, function (err, result) {
        expect(err).toEqual(null);
        expect(result).not.toEqual(null);
        expect(result.age).toEqual(20);
        done()
    })
})

test('删除插入的用户', done => {
    expect(db).not.toEqual(null)
    db.collection(collection).deleteOne({
        name: user.name
    }, function (err, result) {
        expect(err).toEqual(null);
        expect(result).not.toEqual(null);
        expect(result.deletedCount).toEqual(1);
        done()
    })
})

test('删除collection', done => {
    expect(db).not.toEqual(null)
    db.dropCollection(collection, function (err, result) {
        console.log(result)
        expect(err).toEqual(null);
        expect(result).not.toEqual(null);
        //expect(result.deletedCount).toEqual(1);
        done()
    })
})