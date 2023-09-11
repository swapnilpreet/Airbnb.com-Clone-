const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const BookingModel = require("../models/booking.model");
const Usermodel = require("../models/user.model");


router.post("/create/booking", authentication, async (req, res) => {
  try {
    const { userId } = req.body;
    const { home, checkIn, checkOut, price, guests } = req.body;

    const booking = await BookingModel.create({
      user: userId,
      home,
      guests,
      checkIn,
      checkOut,
      price,
    });
    res.send({
      success: true,
      message: "Booking Conform",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.get("/get-users-bookings", authentication, async (req, res) => {
  try {
    const { userId } = req.body;
    const booking = await BookingModel.find({ user: userId }).populate({
      path: "home",
      populate: [
        {
          path: "owner",
        },
      ],
    });
    res.send({
      success: true,
      message: "fetching booking Details",
      data: booking,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.delete("/cancel/booking/:id", authentication, async (req, res) => {
  try {
    await BookingModel.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: true,
      message: error.message,
    });
  }
});

module.exports = router;
