const mongoose = require("mongoose");
const cors = require('cors');
const express = require("express");
const products = require('./routes/products');
const app = express();
app.use(cors())
app.use(express.json());
app.use("/products", products)


mongoose.connect("mongodb://localhost:27017/Ebay"
   
)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error(err));


app.listen(3000, () => {
    console.log("Listening to port 3000");
})