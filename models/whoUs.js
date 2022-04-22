const mongoose = require('mongoose');

const whoUsSchema = new mongoose.Schema({
    text: {
        type:String
    },
    version: {
      type:String,  
    },
})


exports.WhoUs = mongoose.model("WhoUs", whoUsSchema);