const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const axios = require("axios");
const port = 4002;

app.use(express.json());

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "FinalProjectDB";

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

  app.post("/api/transaction/create", (req, res) => {
    console.log("inserting transaction");
    console.log(29,req.data)
    const { transaction_id, buyer_username, items, total_amount } = req;

    db.collection("TransactionCollection")
      .findOne({
        transaction_id: transaction_id,
      })
      .then((doc) => {
        if (doc === null) {
          db.collection("TransactionCollection").insertOne({
            transaction_id: transaction_id,
            buyer_username: buyer_username,
            items: items,
            total_amount: total_amount,
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
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
