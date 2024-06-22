const mongoose = require('mongoose')

//schema for user's data
const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userid : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    emailid : {
        type : String,
        required : true,
        unique : true
    },
    usertype : {
        type : String,
        default : 'CUSTOMER',
        enum : ['CUSTOMER','ADMIN']
    },
},{timestamps : true, versionKey : false})

module.exports = mongoose.model('user',schema)   //create a collection using this schema