const router = require("express").Router();
var braintree = require("braintree");
require('dotenv').config();


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

router.get("/braintree/token", async (req, res) => {
     try {
         gateway.clientToken.generate({},function(err,response){
           if(err){
             throw new Error('Error occur in Getting token from payment')
           }else{
             res.send({
              success:true,
              message:"geting token successful",
              data:response
             })
           }
         })
     } catch (error) {
      res.send({
        success:false,
        message:error.message,
       })
     }
});


router.post("/braintree/payment", async (req, res) => {
   try {
       const {price,nonce} = req.body;

       let newTransaction = gateway.transaction.sale({
        amount:price,
        paymentMethodNonce:nonce,
        options:{
          submitForSettlement:true
        }
       },
        function (err, result) {
        if (err) {
           throw new Error(err);
        }
        if(result.success) {
           res.send({
            success:true,
            message:"payment Successful"
           })
        } else {
           throw new Error(result.message)
        }
      })
   } catch (error) {
      res.send({
        success:false,
        message:error.message
      })
   }
});


module.exports = router;