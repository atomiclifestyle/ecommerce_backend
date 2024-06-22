//logic for the requests

const bcrypt = require('bcryptjs')
const user_model = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\models\\user_models_schema.js')
const jwt = require('jsonwebtoken')
const values = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\config_values.js')


//logic for registration/signup of the user

exports.signup = async (req,res) => {

    const request = req.body      

    const userobj = {              //receives the request
        name : request.name,
        userid : request.userid,
        emailid : request.emailid,
        usertype : request.usertype,
        password : bcrypt.hashSync(request.password,8) 
    }

    try {
        const user_created = await user_model.create(userobj)    //creates a user in the DB using server

        const res_obj = {
            name : user_created.name,         //return only those needed
            userid : user_created.userid
        }

        res.status(201).send(res_obj)

    } catch (err) {
        console.log('error while creating the user')        //error handling

        res.status(500).send({
            message : 'error while creating the user'
        })
    }
}

//logic for login of the user

exports.login = async (req,res) => {

    //check the userid is registered
    const user_login = await user_model.findOne({userid : req.body.userid})
    if(user_login == null){
        return res.status(400).send({
            message : "user id is not registered"    //like return statement
        })
        
    }

    //check if the password is correct
    const pass_login = bcrypt.compareSync(req.body.password, user_login.password)  //method that compares the encrypted and non encrypted values
    if(!pass_login){
        return res.status(400).send({
            message : "wrong password"    //like return statement
        })
    }
    //respond with the token
    const token = jwt.sign({id : user_login.userid}, values.jwt_secret, {          //token containing id, secret and expiry time
        expiresIn : 120
    })

    res.status(200).send({
        name : user_login.name,
        userid : user_login.userid,
        accesstoken : token
    })
}