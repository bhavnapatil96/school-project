const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');

let FacultySchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    qaulification:{
        type:String,
    },
    doj:{
        type:Date
    },
    isDelete:{
        type:Boolean,
        default:true
    }
});
let faculty1=mongoose.model('faculty1',FacultySchema);
module.exports={faculty1};