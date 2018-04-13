const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');

let EventSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    date:{
        type:Date,
    },
    organizer:{
        type:String,
    },
    isDelete:{
        type:Boolean,
        default:true
    }
});
let event=mongoose.model('event',EventSchema);
module.exports={event};