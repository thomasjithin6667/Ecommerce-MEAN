//import wishlist
const wishlists = require('../models/wishlistSchema')

//logic for wishlist
 exports.addtowishlist= async(req,res)=>{
    //get product details from requset
    // req.body={
    //     id:'3',
    //     title:'hd',
    //     price:555
    // }
    //destructure req.body

  const {id,title,price,image} = req.body

  //logic
  try{
      const item= await wishlists.findOne({id})
      if(item){
        res.status(404).json("Product already exists")
      }
      else{
        //add item to wishlist collection
        const newItem = new wishlists({id,title,price,image})
        //to store in wishlist collection
        await newItem.save()
        res.status(200).json("Product added to the wishlist")
      }
  }
  catch(error){
    res.status(404).json(error)
  }
 }

 //logic  for view wishlist products details

 exports.getWishlist=async(req,res)=>{
  try{
    const allwishlists=await wishlists.find()
    res.status(200).json(allwishlists)
  }
  catch(error){
    res.status(404).json(error)
  }

 }

 //delete wishlist product
 exports.deleteWishlist=async(req,res)=>{
  //get id from the request
  const{id}=req.params
  //logic for delete wishlists product details
  try{
    const removeWishlists=await wishlists.deleteOne({id})

    if(removeWishlists){
      const allitems= await wishlists.find()
      res.status(200).json(allitems)
    }
  }
  catch(error){
    res.status(404).json.error
  }
 }