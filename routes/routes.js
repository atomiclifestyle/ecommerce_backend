//receives the call from the client and directs it to the appropriate controller

const authcontroller = require('../controller/auth.controller.js')
const verifymw = require('../Middlewares/signup.mw.js')

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup",[verifymw.signup_verify], authcontroller.signup)  
    //if you get a post request with that uri, direct it to the signup controller

    //redirection for login request
    app.post("/ecomm/api/v1/auth/login", [verifymw.login_verify], authcontroller.login)
}