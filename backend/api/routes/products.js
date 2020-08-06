
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//  get all products available
//  localhost:3000/products
//  controlling what to fetch, mainly ignoring _v
//  .select('name price _id')
router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            console.log(docs);

            const response = {
                //count:  docs.length,
                //  just returning an array
                //products:  docs
                //  or suppressing _v
                products:  docs.map(doc => {
                    return {
                        name:  doc.name,
                        price:  doc.price,
                        _id:  doc.id,
                    }
                })
            };
            
            //  returning only the arrys, namely docs
            //res.status(200).json(docs);
            //  alternatively
            res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:  err
        });
    });
});

//  {"name": "Jeff","price": "100"}
//  or localhost:3000/products/?name="Jeff"&&price="100.00"
//  made changes to product.js, the model
//  so that both name and price are required, which I think
//  makes more sense, maybe?
router.post('/', (req, res, next) => {
    //  use model to store data
    const product = new Product({
        //  function constructor for a unique ID
        _id: new mongoose.Types.ObjectId(),
        name:  req.body.name,
        price:  req.body.price
    });

    //  now save it to mongoDB
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                //createdProduct:  result
                //  maybe a more exact result? (without the strange _v for example)
                createdProduct:  {
                    name:  result.name,
                    price:  result.price,
                    _id:  result._id,
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:  err
            });
        });
});

//  localhost:3000/ + _id
//  localhost:3000/products/5eb8732398582a4670844443
router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);

            //  in case it is a valid ID but which does not exist
            if (doc){
                //  if removing the .select to keep the strang _v thing
                //res.status(200).json(doc);
                res.status(200).json({
                    product:  doc,
                })
            } else {
                res.status(404).json({message:  'No valid entry found for provied ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:  err});
        });
});

//  to change only the first field
//  [{"propName": "name", "value": "Harry"}	]
//  to change only the second file
//  [{"propName": "price", "value": "1.00"}	]
//  to change both fields at the same time
//  [{"propName": "price", "value": "11.00"},{"propName": "name", "value": "Book1"}]
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        //res.status(200).json(result);
        res.status(200).json({message:  'product updated'})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
//  localhost:3000/products/5eb86a03f07352090463c964
//  localhost:3000 + _id
router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.deleteOne({ _id:  id })
    .exec()
    .then(result => {
        //res.status(200).json(result);
        res.status(200).json({
            message:  'product deleted'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:  err
        });
    });
});

module.exports = router;