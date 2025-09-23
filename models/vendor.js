const mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;


const vendorSchema= new Schema({
    name:{type:String,required:true},
    phone:{type:String,required:true},
    date:{type:Date,required:true},
    location:{type:String,required:true}, 

    created_At:Date,
    update_At:Date

})
vendorSchema.plugin(timeStamps,{index:true});
module.exports=mongoose.model('vendor',vendorSchema);
