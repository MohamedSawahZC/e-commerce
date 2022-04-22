const mongoose = require('mongoose');
const { CallUs } = require('../models/callus');
const cloudinary = require("../util/cloudinary");

exports.add = async (req, res, next) => {
    try {
        const file = req.files.logo
        var imgData;
        await cloudinary.uploader.upload(file.tempFilePath, (err, result) => { 
          imgData = result.url
        })
        const { name, link } = req.body;
        let callus = new CallUs({
            name,
            logo: imgData,
            link,
        })
        await callus.save();
        res.send(callus);
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        let data = await CallUs.find();
        if (data.length === 0) res.send("No items");
        res.send(data);
    } catch (error) {
        next(error)
    }
}
exports.update = async (req, res, next) => {
    try {
        let data = await CallUs.findOneAndUpdate(req.params.id, req.body, {
            returnOriginal:false
        })
        res.send(data);
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await CallUs.findByIdAndRemove(req.params.id);
        res.send("Item deleted successfully")
    } catch (error) {
        console.log(error);
        next(error)
    }
}