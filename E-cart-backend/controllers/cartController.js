//import cart
const carts =require('../models/cartSchema')
//add cart
exports.addToCart = async(req,res)=>{
    //get product details from request
    const {id,title,price,image,quantity,grandTotal} = req.body

      //logic
  try{
    const item= await carts.findOne({id})
    if(item){
         //add item to cart collection with increment function
     item.quantity +=1
     //update the product grand total
     item.grandTotal = item.price* item.quantity
     //tp update product grand total in mogodb collection
     item.save()
     //to send response back to client
     res.status(200).json("Product added successfully")
     
    }
    else{
       
        //add product to cart
      const newItem = new carts({id,title,price,image,quantity,grandTotal:price})
      //to store in cart collection
      await newItem.save()
      res.status(200).json("Product added to the cart")
    }
}
catch(error){
  res.status(404).json(error)
}


}


//get cart
exports.getCart=async (req,res)=>{
  try{
    //logic check
    const allcarts= await carts.find()
    res.status(200).json(allcarts)
  }
  catch(error){
    res.status(404).json(error)
  }
}

//remove cart item
 //delete wishlist product
 exports.deleteCartItem=async(req,res)=>{
  //get id from the request
  const{id}=req.params
  //logic for delete wishlists product details
  try{
    const removeCartItem=await carts.deleteOne({id})


    if(removeCartItem.deleteCount!=0){
      const allcarts= await carts.find()
      res.status(200).json(allcarts)
      
    }else{
      res.status(404).json("Item not found")
    }
  }
  catch(error){
    res.status(404).json.error
  }
 }

//cart increment
exports.incrementCart=async (req,res)=>{
  //get product id from req
  const{id}=req.params
  try{
//logic
//check product id in cart collection,if its exists then increment quantity
const product =await carts.findOne({id})
//if its exists incre quanti
if (product) {
  
  //update product quantity and grand total
  product.quantity+=1
  product.grandTotal=product.price*product.quantity
  //save changes in mongodb
  await product.save()
  //incre quantity,get all cart collection item and updating particular item count
  const allcarts= await carts.find()
  res.status(200).json(allcarts)
}
else{
  res.status(404).json("item not found")
}

  }
  catch(error){
     req.status(404).json(error) 
  }
}

exports.decrementCart=async(req,res)=>{
  //get product id from the request
  const{id}=req.params
  try{
      //logic
      //check product in cart collection
      const product=await carts.findOne({id})
      if(product.quantity==1){
          const removecart=await carts.deleteOne({id})
          const allcarts=await carts.find()
          res.status(200).json(allcarts)
      }
      else{
      //if it exists increment quantity
      if(product){
          //update product quatity and granf total(price)
          product.quantity-=1;
          product.grandTotal=product.price*product.quantity;
          //save changes in mongodb
          await product.save();
          //increment the qty ,get all cart collection item and updating in particular item count
          const allcarts= await carts.find()
          res.status(200).json(allcarts)
          
      }
      else{
          res.status(404).json("Item not found")
      }

  }
}
  catch(error){
      res.status(404).json(error)
  }
}