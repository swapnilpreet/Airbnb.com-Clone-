const { Error } = require('mongoose');
const Usermodel = require('../models/user.model');
const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authentication = require('../middlewares/authentication');



router.post('/register',async (req,res)=>{
    try {
        const username = await Usermodel.findOne({name: req.body.name});
        if(username){
            throw new Error("user name already exists")
        }
        const user = await Usermodel.findOne({email: req.body.email});
        if(user){
            throw new Error("user already registered")
        }
        else{
            // hah user password
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(req.body.password,salt);
            req.body.password = hashpassword;
            // save user in db
            const newuser = new Usermodel(req.body);
            await newuser.save();
            res.send({
                success: true,
                message: "Register successfully",
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

router.post('/login',async(req,res)=>{
    try {
        const user = await Usermodel.findOne({email: req.body.email});
        if(!user){
            throw new Error("Invalid email")
        }
        if(user.status !== 'active'){
            throw new Error("user's account is bloacked, contact to administrator")
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password,
        )
        if(!validPassword) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.TOKEN_SECRET);
        res.send({
            success: true,
            message: 'user login successfully',
            data: token
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

// get current user
router.get('/profile',authentication,async(req,res)=>{
    try {

        const user = await Usermodel.findById(req.body.userId);
        res.send({
            success: true,
            message: "get current user successfully",
            data: user,
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

// get all user 
router.get("/get-all-users",authentication, async(req,res)=>{
    try {
        const userRole = await Usermodel.findById(req.body.userId)
        if(userRole.role === process.env.ROLE){
            const user = await Usermodel.find();
            res.send({
                success: true,
                message: "user fetch successfully",
                data:user
            })
        }else{
            throw new Error("this route only for admin you can't access it");
        }
    } catch (error) {
        res.send({
            success:true,
            message:error.message
        })
    }
})

router.put('/update-user-status/:id',authentication,async (req,res)=>{
    try {
        const userRole = await Usermodel.findById(req.body.userId)
        if(userRole.role === process.env.ROLE){
            await Usermodel.findByIdAndUpdate(req.params.id,req.body);
            res.send({
                success: true,
                message:'User status updated successfully'
            })
        }else{
            throw new Error("this route only for admin you can't access it");
        }

    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})

module.exports = router;
