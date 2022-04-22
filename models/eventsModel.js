const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true,
    },
    image: {
        type: String,
        required:true
    }
})

exports.Event = mongoose.model("Event", eventSchema);