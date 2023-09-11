const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    },
    status:{
        type:String,
        default:'active',
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Home',
    }],
},{
    timestamps:true,
});

const Usermodel = mongoose.model('User',userSchema);
module.exports = Usermodel;