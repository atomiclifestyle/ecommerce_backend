//starting file and takes care of te server

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const values = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\config_values.js')
const user_model = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\models\\user_models_schema.js')
const bcrypt = require('bcryptjs')

//middleware(b/w server and routes) that converts incoming json file(from postman) to js object
app.use(express.json())

//connect the route to the server and pass app object

require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\routes\\routes.js')(app)
require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\routes\\category.routes.js')(app)


//start the server

app.listen(values.PORT, () => {
    console.log('server is started at port ' + values.PORT)
})


//connect to mongodb

mongoose.connect(values.db_url)

const db = mongoose.connection

db.once('open', () => {
    console.log('connected to the mongodb')
    initialize()
})

//initialize by creating a admin

async function initialize(){
    try{
        let user = await user_model.findOne({usertype : 'ADMIN'})
    if(user){
        console.log('Admin is already present')
        return
    }

    try{
        user = await user_model.create({
            name : 'Hari',
            userid : 'hari_ecomm',
            emailid : 'harikishoares2006@gmail.com',
            usertype : 'ADMIN',
            password : bcrypt.hashSync("hello1",6),   //hashing the password by using 6 as a salt
        })
        console.log('admin created ' + user)
    }catch(err){
        console.log('error occured while creating admin')
    }
    }catch(err){
    console.log('error occured while reading data')
    }
}

