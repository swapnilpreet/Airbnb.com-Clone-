const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const AddHome = require("../models/home.model");
const ReviewModel = require("../models/review.model");




// review.routes.js
// Add a new review for a product

router.post('/add-review/:homeId',authentication, async (req, res) => {
  try {
    const { homeId } = req.params;
    const {userId, rating, comment } = req.body;
    const home = await AddHome.findById(homeId);
    if (!home) {
      throw new Error('Home not found')
    }
    const newReview = new ReviewModel({
      user: userId,
      home: homeId,
      rating,
      comment,
    });
    await newReview.save();
    res.send({
        success: true,
        message: 'Review added successfully',
    });
  } catch (error) {
    res.send({
        success: false,
        message: error.message,
    });
  }
});
// Get all reviews for a product
router.get('/get-all/:homeId',authentication, async (req, res) => {
  try {
    const { homeId } = req.params;
    const reviews = await ReviewModel.find({ home: homeId }).populate('user');
    res.send({
        success: true,
        data: reviews,
        message: 'Review successfully fetching'
    })
  } catch (error) {
    res.send({
        success: false,
        message: error.message
    })
  }
});
// Edit a review
router.put('/edit/:reviewId',authentication, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await ReviewModel.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );
    if (!review) {
        throw new Error('Review not found')
    }
    res.send({
        success: true,
        message:  'Review edit successfully',
    })
  } catch (error) {
    res.send({
        success: false,
        message: error.message,
    })
  }
});
// get review by id
router.get('/get-review-by-id/:id',authentication,async(req,res)=>{
   try {
      const {id} = req.params;
      const review = await ReviewModel.findById(id);
      if(!review){
        res.send({
          success:true,
          message: "Review Not found in DB",
         })
      }
      res.send({
        success:true,
        data:review
       })
   } catch (error) {
     res.send({
      success:true,
      message:error.message,
     })
   }
})
// Delete a review
router.delete('/delete/:reviewId',authentication, async (req, res) => {
  try {
    const {reviewId} = req.params;
    const review = await ReviewModel.findByIdAndDelete(reviewId);
    if (!review) {
      throw new Error('Review not found')
    }
    res.send({
        success:true,
        message:'Review deleted successfully',
    });

  } catch (error) {
    res.send({
        success:false,
        message:error.message,
    })
  }
});




module.exports = router;
