const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const axios = require("axios");
const redis = require("redis");
const port = 4002;

app.use(express.json());

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "MyDatabase";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Connected successfully to server");
  const db = client.db(dbName);


  app.get('/items', function (req, res) {
    var itemId = parseInt(req.query.itemId);
    if(req.originalUrl == '/items?itemId='+itemId)
      console.log("getting item");

    db.collection('Inventory').findOne({product_id: itemId}).
    then((result)=>{
      //console.log(result);
      res.send(result);
    });

  });

  app.get('/allitems', function (req, res) {
      db.collection('Inventory').find().toArray().
      then((result)=>{
              res.send(result);
      });      
  });

  app.get('/useritems', function (req, res) {
    var user = req.query.user;
    console.log(user);
    if(req.originalUrl == '/useritems?user='+user)
      console.log("getting user items");

    db.collection('Inventory').find({seller_username: user}).toArray().
    then((result)=>{
      //console.log(result);
      res.send(result);
    });
  });


  app.get('/purchasehistory', function (req, res) {

    
  });

  app.post('/create+purchase', function (req, res) {
    const { name, price, image } = req.body;
    /*
    const body = {
      name: name,
      price: price,
      image: image,
    };
    */
    const body = {
      name: 'newitem',
      price: 11,
      image: 'image',
    };

    db.collection('Inventory').insertOne(body);
  });



  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});


/*
app.get('/*', function (req, res) {
    console.log(db.collection('Item').find());
  res.send();
});
*/