/**
 * controller for creating a category of items
 * 
 * request body,
 * {
 *  "name" : "electronic",
 *  "description" : "it contains electronic items"
 * } 
 */

const cat_model = require('c:\\Users\\subbp\\Desktop\\my_ecomm_project\\models\\category.schema.js')


exports.show_category = async (req, res) => {
    const request1 = req.body

    try {
        const obj = await cat_model.findOne({name : request1.name})

        const obj2 = {
            name : obj.name,
            description : obj.description
        }

        res.status(200).send(obj2)

    } catch (err) {
        console.log('error while getting the category')        //error handling

        res.status(500).send({
            message : 'error while getting the category'
    })
}
}

exports.create_category = async (req,res) => {

    //read the request
    const request = req.body

    //create object
    const cat_obj = {
        name : request.name,
        description : request.description,
    }

    //insert into the database
    try {
        const cat_created = await cat_model.create(cat_obj)
        res.status(200).send(cat_created)

    } catch (err) {
        console.log('error while creating the category')        //error handling

        res.status(500).send({
            message : 'error while creating the category'
    })


}
}