const express=require("express");
//const mongoose=require("mongoose");
//const bodyParser=require("body-parser");
const restController=require("../Controllers/restaurant");
const tileController=require("../Controllers/tile");
const extraController=require("../Controllers/extra");
const locationController=require('../Controllers/location');
const userController=require('../Controllers/user');
const cartController=require('../Controllers/cart');
const foodController=require('../Controllers/food');
const cuisineController=require('../Controllers/cuisine');
const cuisineHandlerController=require('../Controllers/cuisineHandler');
const hotelController=require('../Controllers/hotel');
const router=express.Router();


router.get("/api/:cityName",restController.getRestByCity);
router.get("/food/:food_id/:location_id",foodController.getFoodById);
router.get("/cuisine/:cuisine_id",cuisineController.getRestByCuisineId);
router.get("/cuisine1/:cuisine_id1/:cuisine_id2/:cuisine_id3",hotelController.getCuisineById);
//router.get("cuisineHandler3",cuisineHandlerController.getCuisineById);
router.post("/getAllCuisine",hotelController.getCuisineById);
router.get("/getAllCuisine2",hotelController.getAllCuisine);
router.post("/cuisineHandler2",cuisineHandlerController.getAllCuisine);
router.get('/restaurantList/:location_id',restController.getRestByLocation);
router.get("/rest/:restaurant_id",restController.getRestById);
router.get("/hi/cityList",restController.getRestaurants);
router.get("/world/tile",tileController.filterSearch);   //////put post here
router.post('/restaurantfilter',restController.filterSearch);
router.post('/extrafilter',extraController.filterSearch);
router.get('/enti/getfilter',extraController.getData);
router.get('/hello/getLocation',locationController.getLocation);
//router.get('/abbo/getLocation',cuisineController.getLocation);
router.post('/login',userController.getUser);
router.post('/signup',userController.createUser);
router.post('/checkuser',userController.checkUser);
//router.post('/postcart',cartController.createCart);
//router.get('/getcart',cartController.getCart);
router.post('/userCart',userController.userCart);
router.post('/userCartDetails',userController.getUserCartDetails);
router.post('/deleteCartItem',userController.deleteCartItem);
router.post('/updateQty',userController.updateQty);
router.post('/getFoodById',userController.getFoodById);
router.post('/userOrders',userController.addToOrders);

module.exports=router;