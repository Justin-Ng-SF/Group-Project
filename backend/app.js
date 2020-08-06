
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//  mongoose connection
const database_name = "FinalProjectDB";
mongoose.connect('mongodb://127.0.0.1:27017/' + database_name, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;
const database_connection = mongoose.connection;

database_connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


//  middlewares
//  log request origin
app.use(morgan('dev'));
//  what kind of body to parse
//  only URL encoded data with extended set to false
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//  adjust the response
//  to allow access to any client
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //  method of HTTP used on the request
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

//  routes which should handle requests
//  remapping ||ROUTE /products|| to ||ROUTE /|| in api/routes/products.js
app.use('/products', productRoutes);
//  remapping ||ROUTE /orders|| to ||ROUTE /|| in api/routes/orders.js
app.use('/orders', orderRoutes);

//  if no routes match, log errors
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    //  forward error request
    next(error);
})

//  error handling for apps that throws errors directly, i.e. mongoose
app.use((error, req, res, next) => {
    //  in case mongoose operations fail
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;