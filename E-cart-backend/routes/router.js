//import express

const express = require('express')

//import product controller
const productController= require('../controllers/productController')

//import wishlistcontroller
const wishlistController=require('../controllers/wishlistController')

//import cartconytoller
const cartController=require('../controllers/cartController')

//using express create an object for router class in order to setup
const router= new express.Router()

//resolve client request in  various server routes
//all api call will be resolved

//get all products
router.get('/products/all-products',productController.getAllProducts)

//get particular product details
router.get('/products/viewproduct/:id',productController.viewProduct)

//add to wishlist
router.post('/products/addtowishlist',wishlistController.addtowishlist)

//get wishist
router.get('/products/getwishlist',wishlistController.getWishlist)

//delete wishlist item
router.delete('/products/deleteWishlist/:id',wishlistController.deleteWishlist)

//add prodcut to cart
router.post('/products/addtocart',cartController.addToCart)

//get cart
router.get('/products/carts',cartController.getCart)

//deletecartitem
router.delete('/products/deleteCartItem/:id',cartController.deleteCartItem)

//increment item
router.get('/products/increment/:id',cartController.incrementCart)

//decrement item
router.get('/products/decrement/:id',cartController.decrementCart)

//export router
module.exports=router