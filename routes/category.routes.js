
const cat_controller = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\controller\\category.controller.js')
const verifymw = require('../Middlewares/signup.mw.js')


module.exports = (app) => {
    app.post("/ecomm/api/v1/categories",[verifymw.token_verify], cat_controller.create_category)

    app.get("/ecomm/categories", cat_controller.show_category)
}