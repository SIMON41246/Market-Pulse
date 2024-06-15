const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product")
const db = require('monk')('localhost:27017/Ebay')
const { KMeans } = require('ml-kmeans');
const _ = require('lodash');
var collection = db.get('Products');

// GET All products from MongoDB by Category
router.get("/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Get All Products by price_min or just all the products
router.get("/", async (req, res) => {
  try {
    const price_min = parseFloat(req.query.price_min) || 0;
    var products = [];
    if (price_min) {
      products = await collection.find({ price_min: { $lt: price_min } });
    } else {
      products = await collection.find();
    }
    res.render("home",{ products: products.slice(0,20) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
