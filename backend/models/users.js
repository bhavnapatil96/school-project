const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt =require('jsonwebtoken');
let UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    photo:{
        type:String,
    },
    gender:{
        type:String,
    },
    usertype:{
        type:String
    },
    isDelete:{
        type:Boolean,
        default:true
    }
});
UserSchema.statics.findByToken= function(token){
    let user =this;
    let decoded;
    try{
        decoded=jwt.verify(token,'geet');
    }catch(err) {
        return Promise.reject();
    }
    return user.findOne({
        email:decoded.email,
    })
}
let users=mongoose.model('users',UserSchema);
module.exports={users};