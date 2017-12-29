let express =require( 'express');
let path =require( 'path');
let favicon =require( 'serve-favicon');
let morgan =require( 'morgan');
let cookieParser =require( 'cookie-parser');
let bodyParser =require( 'body-parser');
let proxyMiddleware =require( 'http-proxy-middleware');
let {MongoClient} =require( 'mongodb');
let { apiPrefix="/",proxyTable,mongodbUrl,connectConfig,dbName} =require( './config');
let logger =require( 'winston');
let {error500,success} =require( './common');
let get =require( 'lodash/get');
let has =require( 'lodash/has');
let Services =require( './service');
let Routers =require( './routes');
let forOwn=require('lodash/forOwn');
let isObject=require('lodash/isObject');
let isFunction=require('lodash/isFunction');

var app = express();
//proxytable request

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {
        target: options
      }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname,'../public')));

//connect to mongodb
MongoClient.connect(mongodbUrl,connectConfig,function(err,client){
  if (err) {
    logger.warn(`Failed to connect to the db,url:${mongodbUrl}. ${err.stack}`);
  }
  app.locals.db = client.db(dbName);
  app.locals.mongoDispatch=dispatch(app.locals.db);
})


//router
//app.use(apiPrefix, require('./routes/api'));
//app.use('/', index);
//app.use('/users', users);
registryRouters(app,Routers);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/**
 * 转发对service的请求
 */
function dispatch(db) {
  return function ({type,payload}) {
    try {
      if (!type || !has(Services, type)) 
        throw new Error(`type is null or Service not found,type:${type}`)
      let service = get(Services, type);    
      return service(db,payload)
        .then(resp=>success(resp))
        .catch(reject=>{
          throw new Error(`请求service错误,type:${type},error:${reject}`)
        })
      
    } catch (e) {
      logger.error(`发生错误,error: ${e}`)
      return new Promise(resovle => resovle(error500('服务器内部错误')))
    }
  }
}

function registryRouters(app,routers){
  let  flatRouters=loadRouters(routers);
 
  flatRouters.forEach(({path,router})=>{   
    let uri= `${apiPrefix}${path.replace('.',"/")}`;
    console.log('uri',uri);
    app.use(uri,router)
  })
 // app.use("/visual/api/widgets",get(routers,['visual.api','widgets']).router)
}

// 递归查询所有的routes
function loadRouters(routes,parentKey=''){
   let arr=[];
   forOwn(routes,function(value,key){
     if(isObject(value)){
      if(value.hasOwnProperty('router')&&isFunction(value.router))
        arr.push({path:`${parentKey}.${key}`,router:value.router})
      else
        arr=arr.concat(loadRouters(value,key))
     }     
   })
   return arr;
}

module.exports=app;