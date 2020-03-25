const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

const client = new MongoClient(url);

const connection = client.connect();

// Use connect method to connect to the server

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  findDocuments(db, function() {
    client.close();
  });
});
*/

class MongoBot {

  constructor() {
    const url = 'mongodb://localhost:27017';

    this.client = new MongoClient(url);
  }

  async init() {
    const dbName = 'myproject';

    await this.client.connect();
    console.log('connected');

    this.db = this.client.db(dbName);
  }
}

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('agents');
  // Insert some documents
  collection.insertMany([
    {name : "Amy",
      skill:["skillA"],
      availability: true}, 
    {name: "Bob",
      skill:["skillB"],
      availability: true}, 
    {name : "Candice",
      skill: ["skillC"],
      availability:true},
      {name:"Dan",
      skill:["skillA","skillB"],
      availability:true},
      {name:"Emma",
      skill:["skillB","skillC"],
      availability:true}

  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('agents');
  // Find some documents
  collection.find({skill:{$all:["skillA"]},availability:true}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

async function start() {
  const mongo = new MongoBot();
  await mongo.init();
  findDocuments(mongo.db, function(){
    mongo.client.close();
  });
}

start();
module.exports = new MongoBot();
module.exports = {insertDocuments, findDocuments};






  