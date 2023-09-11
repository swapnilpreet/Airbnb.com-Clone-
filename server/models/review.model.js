const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
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
  comment:{
    type:String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  }
},
{timestamps:true}
);

const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
