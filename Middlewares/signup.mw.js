//MW between routes and controller
//to check the validity of the request


const user_model1 = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\models\\user_models_schema.js')
const jwt = require('jsonwebtoken')
const values = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\config_values.js')


exports.signup_verify = async (req,res,next) => {
    try {
        if(!req.body.name){
            return res.status(400).send({
                message : "Name not provided"
            })
        }

            const user1 = await user_model1.findOne({name : req.body.name})

            if(user1){
                return res.status(400).send({
                    message : "User already present"
                })
            }

            next()

    } catch (err) {
        console.log('error during verification')
        res.status(500).send({
            message : "error while validating request"
        })
    }

}

exports.login_verify = async (req,res,next) => {
    try {
        if(!req.body.userid){
            return res.status(400).send({
                message : "userid not provided"
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message : "password not provided"
            })

            
        }
        next()
         
    }catch (err) {
        console.log('error during verification2')
        res.status(500).send({
            message : "error while validating request2"
        })
    }

}

//to verify if the person used to create a category is a admin user or not
exports.token_verify = (req,res,next) => {

    //check if token is present
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(400).send({
            message : "UnAuthorized ! token not present"
        })
    }


    
    jwt.verify(token,values.jwt_secret, async (err,decoded) => {
        if(err){
            return res.status(400).send({
                message : "UnAuthorized ! token not verified"
            })
        }

        const user = await user_model1.findOne({userid : decoded.id})

        if(!user){
            return res.status(400).send({
                message : "UnAuthorized ! token not present"
            })
        }

        if(user.usertype != 'ADMIN'){
            return res.status(400).send({
                message : "UnAuthorized ! user is not a admin"
            })
        }

        next()
    })
}