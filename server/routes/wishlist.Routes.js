const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const Usermodel = require("../models/user.model");

router.put("/add-to-wishlist", authentication, async (req, res) => {
  const { userId } = req.body;
  const { prodId } = req.body;
  try {
    const user = await Usermodel.findById(userId);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await Usermodel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            wishlist: prodId,
          },
        },
        {
          new: true,
        }
      );
      res.send({
        success: true,
        message: "product removed successfully",
        data: user,
      });
    } else {
      let user = await Usermodel.findByIdAndUpdate(
        userId,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.send({
        success: true,
        message: "product removed successfully",
        data: user,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-wishlist", authentication, async (req, res) => {
  const { userId } = req.body;
  try {
    const findUser = await Usermodel.findById(userId).populate("wishlist");
    res.send({
      success: true,
      message: "fetching wishliist successfull",
      data: findUser,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
