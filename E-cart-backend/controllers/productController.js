//import product collection

const products= require('../models/productSchema')

//define logic to resolve client request

//get all products

exports.getAllProducts= async(req,res)=>{
    try{
        //get all products from product collection in mongodb
        const allProducts= await products.find()
        res.status(200).json(allProducts)

    }catch(error){
        res.status(401).json(error)
    }
}

//get particulaar product
exports.viewProduct=async(req,res)=>{
    const id= req.params.id
    //logic
    try{
       //check id is present in mongodb
       const product= await products.findOne({id})
        if(product){
            res.status(200).json(product)

        }else{
            res.status(404).json("product not found")
        }
    }
    catch(error){
        res.status(400).json(error)
    }
}