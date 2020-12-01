
const { response } = require("express");
const restData=require("../Models/restaurant");

exports.filterSearch=(req,res,next)=>
{

    const queryParams = req.body;   // capturing all the params from request body

    const location_id = queryParams.location_id;
    const cuisine_id = queryParams.cuisine_id;
    const mealtype_id = queryParams.mealtype_id;
    const restaurant_id = queryParams.restaurant_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1;    // 1 is default value for page
    const sort = queryParams.sort ? queryParams.sort : 1;

let start=Number(page*5)-5;
let end=Number(page*5);
let payload={};

if (mealtype_id) {
    payload = {
        mealtype_id: Number(mealtype_id)
    }
}

if (restaurant_id) {
    payload = {
        restaurant_id: Number(restaurant_id)
    }
}
if (mealtype_id && hcost && lcost) {
    payload = {
        mealtype_id: Number(mealtype_id),
        min_price: { $gte: lcost, $lte: hcost }
    }
}
if (mealtype_id && location_id) {
    payload = {
        location_id: Number(location_id),
        mealtype_id: Number(mealtype_id)
    }
}
if (mealtype_id && cuisine_id) {
    payload = {
        cuisine_id: Number(cuisine_id),
        mealtype_id: Number(mealtype_id)
    }
}
if (location_id && cuisine_id && mealtype_id) {
    payload ={
        location_id: Number(location_id),
        cuisine_id: Number(cuisine_id),
        mealtype_id: Number(mealtype_id)
    }
}
if (location_id && cuisine_id && mealtype_id && hcost && lcost) {
    payload = {
        location_id: Number(location_id),
        cuisine_id: Number(cuisine_id),
        mealtype_id: Number(mealtype_id),
        min_price: { $gte: lcost, $lte: hcost }
    }
}
if (location_id && mealtype_id && hcost && lcost) {
    payload = {
        location_id: Number(location_id),
        //cuisine_id: Number(cuisine_id),
        mealtype_id: Number(mealtype_id),
        min_price: { $gte: lcost, $lte: hcost }
    }
}

restData.find(payload).sort({min_price:sort})
    .then(result=>
        {
            const count=Math.ceil(result.length / 5);
            const resultValue=result.slice(start,end);
            const arr=[];
            for(var i=1;i<=count;i++)
            {
                arr.push(i);
            }
            res.status(200).json({message:"restaurants fetched successfully",restaurants:resultValue,totalPages:arr,totalItems:result.length})
        })
    .catch(err=>
        {
            res.status(500).json(err);
        })
}

exports.getRestById=(req,res,next)=>
{
    const restaurant_id=req.params.restaurant_id;
    const payload={restaurant_id:restaurant_id}
    restData.find(payload)
        .then(response=>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
    
}

exports.getRestByCity=(req,res,next)=>
{
    const factload={};
    const city=req.params.cityName;
    const restaurant_id=req.params.restId;

    if(city)
    {
        factload={city:city};
    }
    if(restaurant_id)
    {
        factload={restaurant_id:restaurant_id};
    }
    restData.find(factload)
        .then(response =>
            {
                res.status(200).json({restaurxxs:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
            next;
}

exports.getRestaurants=(req,res,next)=>
{
    
    restData.find()
        .then(response =>
            {
                res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}

exports.getRestByLocation=(req,res,next)=>
{
    const location_id=req.params.location_id;
    const payload={location_id:location_id};

    restData.find(payload)
    .then(response=>{
        res.status(200).json({restaurants:response});
    })
    .catch(err=>
        {
            res.status(500).json(err);
        })
}
