const { count } = require("console");
const express=require("express");
const mongoose=require("mongoose");
const extraData=require("../Models/extra");
const restData=require("../Models/restaurant");

exports.filterSearch=(req,res,next)=>
{

const price=Number(req.body.price);
const sort=req.body.sort ? req.body.sort:1;
let payload={};

if(price)
{
    payload={price:price}
}


extraData.find(payload).sort({price:sort})
    .then(result=>
        {
            /*const count=Math.ceil(result.length / 5);
            const resultValue=result.slice(start,end);
            const arr=[];
            for(var i=1;i<=count;i++)
            {
                arr.push(i);
            }*/
            res.status(200).json({message:"restaurants fetched successfully",restaurants:result});
            next;
        })
        
    .catch(err=>
        {
            res.status(500).json(err);
        })

} //end of export

exports.getData=(req,res,next)=>
    {
        extraData.find().sort({price:-1})
        .then(result=>
            {
                res.status(200).json({mess:"Success",restaurants:result});
            })
            .catch(err=>
                {
                    console.log(err);
                })
    }

