const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    userId:String,
    problem: [
        {
            report: String,
            response:String,
        }
    ]
})

exports.Problem = mongoose.model("Problem", problemSchema);