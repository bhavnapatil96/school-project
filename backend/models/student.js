const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');

let StudentSchema=new mongoose.Schema({
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
        type:String
    },
    isDelete:{
        type:Boolean,
        default:true
    }
});
let student=mongoose.model('faculty',StudentSchema);
module.exports={student};