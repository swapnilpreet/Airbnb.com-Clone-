const express = require("express");
const router = express.Router();
const AddHome = require("../models/home.model");
const authentication = require("../middlewares/authentication");
const Usermodel = require("../models/user.model");


router.get("/get-place/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const place = await AddHome.findById(id).populate("owner");
    if(place){
      res.send({
        success: true,
        message: "getting Home",
        data: place,
      });
    }else{
      res.send({
        success: false,
        message: "Home not FOund in Database",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-place-edit/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const place = await AddHome.findById(id).populate("owner");
    if(userId === place.owner._id.toString()){
      res.send({
        success: true,
        message: "getting Home",
        data: place,
      });
    }else{
      res.send({
        success: false,
        message: "You Dont have permission to Edit Others Homes",
      });
    }
    if (!place) {
      res.send({
        success: false,
        message: "Couldn't find a Home",
      });
    }
   
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/add-home", authentication, async (req, res) => {
  try {
    const { userId } = req.body;
    const {
      Category,
      title,
      rating,
      region,
      address,
      addedPhotos,
      desc,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    const homeadd = await AddHome.create({
      owner: userId,
      Category,
      region,
      rating,
      title,
      address,
      photos: addedPhotos,
      description: desc,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.send({
      success: true,
      message: "Home added Successfully",
      data: homeadd,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.put("/edit-home", authentication, async (req, res) => {
  try {
    const { userId } = req.body;
    const {
      id,
      Category,
      region,
      rating,
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    
    const place = await AddHome.findById(id);
    if (userId === place?.owner.toString()) {
      place.set({
        owner:place.owner._id,
        Category,
        region,
        rating,
        title,
        address,
        photos: addedPhotos,
        description: desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await place.save();

      res.send({
        success: true,
        message: "Home updated successfully",
      });
    } else {
      res.send({
        success: false,
        message: "you Don't have permission to edit Other Homes",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-users-homes", authentication, async (req, res) => {
  try {
    const { userId } = req.body;
    const getHomes = await AddHome.find({ owner: userId }).populate("owner");
    res.send({
      success: true,
      message: "fetting user data",
      data: getHomes,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/get-all-homes", authentication, async (req, res) => {
  try {
    const { Category, region } = req.body;
    let filters = {};
     
    if (region) {
      filters.region = region;
    }
    // filters by category
    if (Category) {
      filters.Category = { $in: Category };
    }
    
    const getHomes = await AddHome.find(filters).populate("owner");
    // console.log(getHomes)
    res.send({
      success: true,
      message: "fetting user data",
      data: getHomes,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// router.post("/get-all-homes", authentication, async (req, res) => {
//   try {
//     const pageNumber = parseInt(req.query.pageNumber) || ;
//     const limit = parseInt(req.query.limit) || 12;
//     const { Category, region } = req.body;
//     let filters = {};
//     const totalPosts = await AddHome.countDocuments().exec();
//     let startIndex = pageNumber * limit;
//     const endIndex = (pageNumber + 1) * limit;
//     filters.totalPosts = totalPosts;
//     if (startIndex > 0) {
//       filters.previous = {
//         pageNumber: pageNumber - 1,
//         limit: limit,
//       };
//     }
//     if (endIndex < (await AddHome.countDocuments().exec())) {
//       filters.next = {
//         pageNumber: pageNumber + 1,
//         limit: limit,
//       };
//     }
 
//     const getHomes = await AddHome.find().skip(startIndex)
//     .limit(limit)
//     .exec();
//     getHomes.rowsPerPage = limit;

//     res.send({
//       success: true,
//       message: "fetting user data",
//       data: getHomes,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// });


router.put("/update-homes-status/:id", authentication, async (req, res) => {
  try {
    const userRole = await Usermodel.findById(req.body.userId);
    if (userRole.role === process.env.ROLE) {
      await AddHome.findByIdAndUpdate(req.params.id, req.body);
      res.send({
        success: true,
        message: "Home Approved",
      });
    } else {
      throw new Error("this route only for admin you can't access it");
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-homes-by-search/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const response = await AddHome.find({ 
      $or: [
         { address: {$regex: key, $options: "i"}}
      ]
    })
    // });
    res.send({
      success: true,
      data: response,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.delete('/delete/:homeid',authentication,async(req, res)=>{
  try {
    const {homeid}= req.params;
    const {userId}= req.body;
    const home = await AddHome.findByIdAndDelete(homeid);
    if (!home){
      throw new Error('Review not found')
    }
    if(home.owner._id.toString()!== userId){
      throw new Error('You Do not have permission to delete this home')
    }
    res.send({
        success:true,
        message:'home deleted successfully',
    });
  } catch (error) {
    res.send({
      success:false,
      message:error.message,
    })
  }
});


module.exports = router;
