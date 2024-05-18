const mongoose = require('mongoose');



const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    shipping: {
        type: String,
    },
    link: {
        type: String,
    },
    image: String,
    category: String,
})



