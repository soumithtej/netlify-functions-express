//const { count } = require("console");
const { response } = require("express");
var express=require("express");
var mongoose=require("mongoose");
var cuisineHandlerData=require("../Models/restaurant");

exports.getAllCuisine=(req,res,next)=>
{
    const cuisine_id1=req.body.cuisine_id1;
    const cuisine_id2=req.body.cuisine_id2;
    const cuisine_id3=req.body.cuisine_id3;
    const cuisine_id4=req.body.cuisine_id4;
    const cuisine_id5=req.body.cuisine_id5;
    const mealtype_id=req.body.mealtype_id;
    const hcost=req.body.hcost;
    const lcost=req.body.lcost;
    const location_id=req.body.location_id;
    const sort=req.body.sort ? req.body.sort : 1;
    let payload={};
    
    if (mealtype_id)
    {
        payload={mealtype_id:mealtype_id,cuisine_id: {$in :[cuisine_id1,cuisine_id2,cuisine_id3,cuisine_id4,cuisine_id5]}}
    }      
    if (mealtype_id && hcost && lcost)
    {
        payload={cuisine_id: {$in :[cuisine_id1,cuisine_id2,cuisine_id3,cuisine_id4,cuisine_id5]},mealtype_id:mealtype_id, min_price :{ $gte: lcost, $lte: hcost }}
    }
    if (mealtype_id && location_id)
    {
        payload={cuisine_id: {$in :[cuisine_id1,cuisine_id2,cuisine_id3,cuisine_id4,cuisine_id5]},location_id:location_id}   
    }
    if (mealtype_id && location_id && hcost && lcost)
    {
        payload={cuisine_id: {$in :[cuisine_id1,cuisine_id2,cuisine_id3,cuisine_id4,cuisine_id5]},location_id:location_id,min_price:{$gte: lcost, $lte: hcost}}
    }   

   cuisineHandlerData.find(payload).sort({min_price:sort})
        .then(response =>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}


/*exports.getAllCuisine=(req,res,next)=>
{
    const cuisine_id1=req.body.cuisine_id1;
    const cuisine_id2=req.body.cuisine_id2;
    const cuisine_id3=req.body.cuisine_id3;
    const cuisine_id4=req.body.cuisine_id4;
    const cuisine_id5=req.body.cuisine_id5;

   cuisineHandlerData.find({cuisine_id: {$in :[cuisine_id1,cuisine_id2,cuisine_id3,cuisine_id4,cuisine_id5]}})
        .then(response =>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}*/

