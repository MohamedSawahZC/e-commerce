const mongoose = require("mongoose");
const cloudinary = require("../util/cloudinary");
const { Event } = require("../models/eventsModel");

exports.addEvent = async (req, res, next) => {
  try {
    const file = req.files.image
    var imgData;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => { 
      imgData = result.url
    })
    let event =await new Event({
      title: req.body.title,
      description: req.body.description,
      image: imgData,
    });
    await event.save();
    res.send(event);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
    try {
        let events = await Event.find();
        res.send(events);
    } catch (error) {
        next(error);
    }
}

exports.deleteEvent = async (req, res, next) => {
    const { id } = req.body;
    try {
        let event = await Event.findOneAndRemove({ _id:id });
        res.send({message:"Item deleted success"})
    } catch (error) {
        console.log(error);
      next(error);
    }
}

exports.updateEvent = async (req, res, next) => {
    try {
        let user = await Event.findOneAndUpdate(req.params.id, req.body, {
            returnOriginal: false,
        });
        res.send({message:"Item updated successfuly"})
    } catch (error) {
        next(error)
    }
}