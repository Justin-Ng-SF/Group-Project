const express = require('express')
const redis = require('redis')
const app = express()
const client = redis.createClient();
const port = 3000;

//const WebSocket = require('ws');

app.get('/redis/*' , (req, res) => {
    client.publish("PubSubChannel", `I have visited`); //going to this page should send msg to all subscribe pages
    res.send('service hit!'); //tested with a tester page 
});


app.get('/item1/*' , (req,res)=> {
    client.set('item1Counter' ,  5 , (err, value) =>{
        if(err){
            console.log('Error adding to redis');
        }
        console.log('Item 1 recorded to redis');
    }); 
    client.get('item1Counter' , (err, value) => {
        if(err){
            console.log('Error getting from redis')
        }
        res.send('The remaining supplies for item1: ' + value);
    });
});

app.get('/item2/*' , (req,res)=> {
    client.set('item2Counter' ,  4 , (err, value) =>{
        if(err){
            console.log('Error adding to redis');
        }
        console.log('Item 2 recorded to redis');
    }); 
    client.get('item2Counter' , (err, value) => {
        if(err){
            console.log('Error getting from redis')
        }
        res.send('The remaining supplies for item2: ' + value);
    });
});

app.get('/item3/*' , (req,res)=> {

});

app.get('/item4/*' , (req,res)=> {

});

app.get('/item5/*' , (req,res)=> {

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//./src/redis-server
//./src/redis-cli