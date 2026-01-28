const mongoose = require("mongoose");
const {Schema} = mongoose;

const garageSchema = new Schema({
    num:{type:Number,required:true},
    name:{type:String,required:true},
    size:{capacity:Number,required:true}
});

module.exports = mongoose.model('Garage',garageSchema);