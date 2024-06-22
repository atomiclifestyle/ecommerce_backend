const mongoose = require('mongoose')

//schema for user's data
const category_schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
        required : true,
    },
    
},{timestamps : true, versionKey : false})

module.exports = mongoose.model('category',category_schema)   //create a collection using this schema