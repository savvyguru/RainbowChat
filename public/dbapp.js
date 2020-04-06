const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



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

  findDocuments(db, skill, callback) {
    // Get the documents collection
    const collection = db.collection('agents');
    // Find some documents
    collection.find({skill:{$all:skill},availability:true}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      callback();
      
      return docs;
    });
  }

  insertDocuments(db, callback) {
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
}



async function start() {
  const mongo = new MongoBot();
  await mongo.init();
  const agents = mongo.findDocuments(mongo.db, ["skillA"], function(){
    console.log(agents);
  });
  mongo.client.close();
}

start();

module.exports = new MongoBot();
//module.exports = {insertDocuments, findDocuments};






  