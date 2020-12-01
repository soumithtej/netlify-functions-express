const { count } = require("console");
var express=require("express");
var mongoose=require("mongoose");
var hotelData=require("../Models/hotel");

/*exports.getCuisineById=(req,res,next)=>
{
    const cuisine_id1=req.params.cuisine_id1;
    const cuisine_id2=req.params.cuisine_id2;
    const cuisine_id3=req.params.cuisine_id3;
  
    hotelData.find({cuisine_id: {$in :[cuisine_id1,cuisine_id2,cuisine_id3]} })
        .then(response =>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}*/

exports.getCuisineById=(req,res,next)=>
{
    const cuisine_id1=req.body.cuisine_id1;
    const cuisine_id2=req.body.cuisine_id2;
    const cuisine_id3=req.body.cuisine_id3;
  
    hotelData.find({cuisine: {$elemMatch: {id: {$in : [cuisine_id1,cuisine_id2,cuisine_id3]}}}})
        .then(response =>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}

exports.getAllCuisine=(req,res,next)=>
{
    hotelData.find()
        .then(response =>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}