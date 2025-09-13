const mongoose=require('mongoose')

async function connect(){
    try{
    await mongoose.connect('mongodb://localhost:27017/siddhiinfornet');
    console.log("......DATA BASE CONNECTED SUCCESSFULLY..........")
    }catch(err){
        console.log(err)
    }
}
module.exports=connect;