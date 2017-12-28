import { MongoClient} from 'mongodb';
import 'babel-polyfill';
import get from 'lodash/get';
import has from 'lodash/has';
import {
    mongodbUrl,
    connectConfig,
    dbName
} from '../../src/config';

import Services from '../../src/service'
//import {should} from 'chai';

let dispatch,client;


var should = require('chai').should()
var promise=new Promise(function(resovle,reject){
    setTimeout(function(){
        resovle({a:1,b:2})
    },1000)
})


describe('widgetService测试',function(){
  
    beforeAll(()=>
        MongoClient.connect(mongodbUrl).then(clt =>{
           client=clt;
           dispatch=function({type,payload}){  
             try{
               if(type&&has(Services,type)){
                   let service=get(Services,type),
                   db=client.db(dbName);
                   return service(db,payload);                   
                }else{
                   console.error('service not found,check type')
                   throw new Error('service not found');
                }
            }  
            catch(e){               
               return new Promise(function(resovle,reject){
                   resovle({code:500,msg:`server error occure,${e}`})
               })
            } 
         }
       })
    )

    // beforeAll(()=>
    //     promise.then(res=>{console.log(res),client=res})
    // )

    // afterAll(done => {client.close();done()})
    test('nomar test',function(){
       console.log(client)
    })

    test('insertOneWidget',async ()=>{
       return client.db(dbName).collection('widgets').insertOne(
            {user:'ttessx',timestamp:new Date().getTime()})
        .then(resp=>expect(resp.insertedCount).toEqual(1))
         
         //resp.insertedCount.should.equal(1);
         //return resp;
    })

    test('getWidgetByParam',()=>{
        //expect(dispatch).not.toEqual(null);
     return  dispatch({
               type:'widgets.getWidgetByParam',
               payload:{
                 name:'testaas',                                
               }})
               .then(resp=>expect(resp.chart).toEqual(20))
     
   })
})