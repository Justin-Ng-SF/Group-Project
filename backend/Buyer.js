const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const axios = require("axios");
const redis = require("redis");
const port = 3001;
var cors = require('cors');

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


  app.get('/api/items', function (req, res) {
    var itemId = parseInt(req.query.itemId);
    if(req.originalUrl == '/items?itemId='+itemId)
      console.log("getting item");

    db.collection('Inventory').findOne({product_id: itemId}).
    then((result)=>{
      console.log(result);
      res.send(result);
    });

  });

  app.get('/api/allitems', function (req, res) {
      db.collection('Inventory').find().toArray().
      then((result)=>{
              res.send(result);
      });      
  });

  app.get('/api/useritems', function (req, res) {
    var user = req.query.user;
    console.log(user);
    if(req.originalUrl == '/api/useritems?user='+user)
      console.log("getting user items");

    db.collection('Inventory').find({seller_username: user}).toArray().
    then((result)=>{
      //console.log(result);
      res.send(result);
    });
  });
  app.post("/api/transaction/create", (req, res) => {
    console.log("inserting transaction");
    console.log(req.body)
    //const { transaction_id, buyer_username, items, total_amount } = req.body.transaction_details[0];

    db.collection("TransactionCollection")
      .findOne({
        transaction_id: req.body.transaction_id,
      })
      .then((doc) => {
        if (doc === null) {
          db.collection("TransactionCollection").insertOne({
            transaction_id: req.body.transaction_id,
            buyer_username: req.body.buyer_username,
            items: req.body.items,
            total_amount: req.body.total_amount,
          });
          res.send({ valid: true });
          console.log("transaction inserted");
        } else {
          res.send({
            valid: false,
          });
          console.log("transaction id is duplicate");
        }
      });
  });

  app.get('/api/purchasehistory', function (req, res) {

    
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