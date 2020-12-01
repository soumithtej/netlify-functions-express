const { count } = require("console");
var express=require("express");
var mongoose=require("mongoose");
var tileData=require("../Models/tile");


exports.filterSearch=(req,res,next)=>
{
    tileData.find()
        .then(response =>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
    
}
