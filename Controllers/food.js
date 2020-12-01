const { count } = require("console");
var express=require("express");
var mongoose=require("mongoose");
var foodData=require("../Models/restaurant");
const { getUserCartDetails } = require("./user");

exports.getFoodById=(req,res,next)=>
{
    const food_id=req.params.food_id;
    const location_id=req.params.location_id;
  
    foodData.find({food: {$elemMatch: {id:Number(food_id)}},location_id:location_id})
        .then(response =>
            {
                res.status(200).json({restaurants:response.map(item=>item.food.filter(item2 => item2.id == food_id))});                        
                //res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
    
}
