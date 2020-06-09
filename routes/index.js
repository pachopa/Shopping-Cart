var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {
    const products = await Product.find((err, docs) => {
      var productChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize));
      }
      console.log('productChunks:', productChunks)
    });
    res.render('shop/index', { title: 'Shopping Cart', products: products });
    
  } catch (err) {
    console.log('products:', products)
    return res.status(500).send(err);
  }

});

module.exports = router;
