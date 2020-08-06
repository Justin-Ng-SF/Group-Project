const express = require('express');
const { MongoClient , ObjectID } = require ('mongodb');
const app = express();
const port = 4000;

app.use(express.json());

const url = 'mongodb://localhost:27017';

const dbName = 'MyDatabase';

const client = new MongoClient(url);

client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const db = client.db(dbName);

  app.post("/api/auth/add", (req, res) => {
    const { userId, userEmail, password, userType } = req.body;
    db.collection("UserCollection")
      .findOne({
        userId : userId,
        //userEmail: userEmail,
      })
      .then((doc) => {
        if (doc === null) {
          db.collection("UserCollection").insertOne({
            userId : userId,
            userEmail: userEmail,
            password: password,
            userType : userType,    
          });
          res.send({ valid: true });
         } else {
          res.send({
            valid: false,
            msg: "This email or user Id is already used!",
            
          });
        }
      })
      .catch((e) => {
        console.log(e);
        
      });
  });
 
  app.post("/api/auth/authenticate", (req, res) => {
    const { userId, password, userType} = req.body;
    if (!password) {
      res.send({
        valid: false,
        msg: "Please enter a password",
      });
    }
    db.collection("UserCollection")
      .findOne({
        userId: userId,
        password  : password,
        userType :userType,
       
      })
      .then((doc) => {
        if (doc) {
          res.send({
            valid: doc !== null && doc.password === password && doc.userType === userType,
            
          });   
        } else {
          res.send({
            valid: false,
            msg: "The user Id or password you entered are incorrect ",
           });
        }
      })
      .catch((e) => {
        console.log(e);
       
      });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
