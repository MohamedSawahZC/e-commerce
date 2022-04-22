const mongoose = require("mongoose");

const callusSchema = new mongoose.Schema({
    name: {
      type:String,  
    },
    logo: {
        type:String,
    },
    link: {
        type:String,
    }
});


exports.CallUs = mongoose.model("CallUs", callusSchema);