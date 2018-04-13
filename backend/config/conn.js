const mongoose=require('mongoose')
mongoose.connect('mongodb://bhavna:bhavika2011@ds135619.mlab.com:35619/schooldb',(err,res)=>{
    if(res){
        console.log('Connected....')
    }
    else{
        console.log('Error in connection.....')
    }
})