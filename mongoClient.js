var client=require("mongodb").MongoClient;
var {schema="demo",port=27107,location="localhost",option={}}=require("./config");

// Initialize connection once
MongoClient.connect(`mongodb://${location}:${port}/integration_test`, function(err, database) {
  if(err) throw err;

  window.mongoClient = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});
