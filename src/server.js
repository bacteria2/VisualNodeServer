/**
 * Module dependencies.
 */
if(process.argv.length>0&&process.argv[2]=='production'){
    console.log('production')
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
  }else{
    console.log('development')
    process.env.BABEL_ENV = 'development';
    process.env.NODE_ENV = 'development';
  }

    
  let app = require('./app');
  let {port} = require('./config');
  let debug = require('debug')('visual-node-server:server');
  let http = require('http');
  
  
  /**
   * Get port from environment and store in Express.
   */
  
  port = normalizePort(port|| '3000');
  app.set('port', port);
  //app.listen(port)
  /**
   * Create HTTP server.
   */
  
  let server = http.createServer(app);
  
  /**
   * Listen on provided port, on all network interfaces.
   */
  
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  
  

  /**
   * Normalize a port into a number, string, or false.
   */
  
  function normalizePort(val) {
    let port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
  /**
   * Event listener for HTTP server "error" event.
   */
  
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'? 'pipe ' + addr: 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('listening')
  }
  