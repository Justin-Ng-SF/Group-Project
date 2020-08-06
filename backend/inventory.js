const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const port = 4003;

app.use(express.json());

// To connect open compress community and hit connect without the inputting anything

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'FinalProjectDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Connected successfully to server');
  const db = client.db(dbName);

  // update for checkout
  // http://localhost:4000/api/sellUpdate?itemId=testitem&amount=1
  app.get('/api/sellUpdate', (req, res) => {
    console.log('Updating Inventory (Sell)');
    sold = -(req.query.amount);
    db.collection('Inventory')
      .findOneAndUpdate(
          {"item": req.query.itemId},
          {$inc: {"inventory": sold}},
          {returnOriginal : false}
      )
    //   .findOne({
    //       item:req.query.itemId
    //   })
    //   .update(
    //       {item: req.query.itemID},
    //       {
    //           $set: {inventory: req.query.amount}
    //       }
    //   )
      .then(doc => {
        console.log(doc);
        //console.log(req.query.amount);
        x = doc.value;
        res.send({
            x      
        })
      })
      .catch(e => {
        console.log(e);
        res.send('Error', e);
      });
  });

  // Seller Update
  // http://localhost:4000/api/inventoryUpdate?itemId=testitem&price=2&amount=1
  app.get('/api/inventoryUpdate', (req, res) => {
    name = req.query.itemId;
    price = req.query.price;
    stock = parseInt(req.query.amount);
    console.log(typeof(stock));
    db.collection('Inventory')
        .findOneAndUpdate(
            {"item": name},
            { $set: {"prices": price}, $inc: {"inventory": stock}},
            { returnOriginal : false}
        )
        .then(doc => {
            console.log(doc);
            res.send({doc})
        })
        .catch(e => {
            console.log(e);
            res.send('Error', e);
        });
  })

  // Seller Update (New Item)
  // http://localhost:4000/api/newItem?itemId=testitem2&price=2&amount=5
  app.post("/api/inventory/newItem", (req, res) => {
    seller = req.body.seller;
    name = req.body.itemName;
    price = req.body.itemPrice;
    stock = req.body.itemQuantity;
    desc = req.body.itemDesc;
    //console.log(typeof(name));

    const { itemName } = req.body;

    console.log(stock);
    
    db.collection('Inventory').findOne({item : name}, {$exists: true})
      .then(doc => {
        if(doc){
          console.log(doc)
          res.send({valid: false,})
        } else {
          db.collection('Inventory')
            .insertOne(
                {"sellerid": seller,
                  "item": name,
                "prices": price, 
                "inventory": stock,
                "description": desc,
              },
            )
            .then(newDoc => {
              console.log(newDoc.ops)
              res.send({valid: "true"})
            })
        }
      })

        // db.collection('Inventory')
        //     .insertOne(
        //         {"item": name,~
        //         "prices": price, 
        //         "inventory": stock},
        //     )
        //     .then(doc => {
        //         //console.log(doc);
        //         res.send({doc})
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         res.send('Error', e);
        //     });
        // res.send("Not find");
        // console.log("fail")
    
  });

  //get seller itmes
  app.post('/api/inventory/getMyItems', (req, res) => {
    seller = req.body.seller;
    console.log(seller);
    db.collection('Inventory')
      .find({
        sellerid: seller
      }).toArray()
      .then(doc =>{
        console.log(doc);
       // qty = doc.inventory       
        res.send(doc);
      })
      .catch(e => {
        console.log(e)
      })

  })

  // Get Inventory Amount
  // http://localhost:4000/api/inventoryCheck?itemId=testitem
  app.get('/api/inventoryCheck', (req, res) => {
    lookingFor = req.query.itemId
    db.collection('Inventory')
      .findOne({
        item: lookingFor
      })
      .then(doc =>{
        qty = doc.inventory       
        res.send(`${qty}`)
      })
      .catch(e => {
        console.log(e)
      })

  })

  // Get Item image
  // http://localhost:4000/api/getImage?itemId=testitem
  app.get('/api/getImage', (req, res) => {

  })



  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});