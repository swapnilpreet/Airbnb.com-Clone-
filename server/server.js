const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const connections = require('./config/dbconfig')
const userRoute = require('./routes/user.Routes')
const uploadRoute = require('./routes/upload.Routes')
const addhomeRoute = require('./routes/homes.Routes')
const wishlistRoute = require('./routes/wishlist.Routes')
const bookingRoute = require('./routes/booking.Routes')
const paymentRoute = require('./routes/payment.Routes')
const cloudinary = require('cloudinary').v2;
const reviewRoute = require('./routes/review.Routes');
var cors = require('cors');


const whiteList = [
     'http://localhost:3000',
];

   
app.use(
     cors({
       credentials: true,
       origin: function (origin, callback) {
         if (whiteList.indexOf(origin !== -1)) {
           callback(null, true);
         } else {
           callback(new Error('Not allowed by cors'));
         }
       },
       exposedHeaders: ['set-cookie'],
     })
   );

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 8080;
app.use(express.urlencoded({extended:false}))

app.use('/api/users',userRoute);
app.use('/api/home-images',uploadRoute);
app.use('/api/add-home',addhomeRoute);
app.use('/api/wishlist',wishlistRoute);
app.use('/api/booking',bookingRoute);
app.use('/api/payment',paymentRoute);
app.use('/api/review',reviewRoute);



// deployemnet configuration

const path = require('path');
__dirname=path.resolve();
// render deployment

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}




app.listen(port,()=>{
     console.log(`listening on port number ${port}`)
})