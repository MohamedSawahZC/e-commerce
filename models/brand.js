const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    image:{
        type:String,
    }
})


exports.Brand = mongoose.model("Brand", brandSchema);