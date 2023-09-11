// models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  photos: [{ type: String }],
  description: {
    type: String,
  },
  amenities: [{ type: String }],
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
  },
  status: {
    type: String,
    default:"pending"
  },
  checkOut: {
    type: Number,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
  },
  region:{
    type: String,
  },
  rating:{
    type: Number,
  }
}
,{
    timestamps:true,
});

const AddHome = mongoose.model('Home', productSchema);

module.exports = AddHome;
