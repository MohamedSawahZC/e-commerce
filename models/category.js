const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
    },
    image:{
        type:String,
    }
})


exports.Category = mongoose.model("Category", categorySchema);