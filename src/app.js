import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import proxyMiddleware from 'http-proxy-middleware';
import {MongoClient} from 'mongodb';
import { apiPrefix,proxyTable,mongodbUrl,connectConfig} from './config';
import logger from 'winston';
import {submitService} from './common';
import get from 'lodash/get';
import has from 'lodash/has';
import Services from './service';
import Routers from './routes';


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
MongoClient.connect(mongodbUrl,connectConfig,function(err,db){
  if (err) {
    logger.warn(`Failed to connect to the db,url:${mongodbUrl}. ${err.stack}`);
  }
  app.locals.db = db;
  app.locals.mongoDispatch=dispatch(db);
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



function dispatch(db) {
  return function ({type,payload}) {
    try {
      if (type && has(Services, type)) {
        let service = get(Services, type);
        return service(db, action.payload)
      } else {
        throw new Error(`type is null or Service not found,type:${type}`)
      }
    } catch (e) {
      logger.error('发生错误', e)
      return newPromise(resovle => resovle(error500('服务器内部错误')))
    }
  }
}

function registryRouters(app,routers){
  console.log('router',get(routers,['visual.api','widgets']).default)
  app.use("/visual/api/widgets",get(routers,['visual.api','widgets']).default)
}

export default app;