const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },
  guests:{
    type:Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment:{}
},{timestamps:true});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
