const cartData=require("../Models/cart");

exports.createCart=(req,res,next)=>
{
    const restaurant=req.body.restaurant;
    const restaurant_id=req.body.restaurant_id;
    const food=req.body.food;
    const id=req.body.id;
    const cost=req.body.cost;
    //const payload={restaurant_id:restaurant_id,restaurant:restaurant,food:food,cost:cost,id:id};
    const newCart=new cartData({restaurant_id:restaurant_id,restaurant:restaurant,food:food,cost:cost,id:id});

    newCart.save()
    .then(response =>
        {
            res.status(200).json({message:"cart added successfully",carts:response});
        })
        .catch(err=>res.status(500).json({message:err}))

    cartData.find()
        .then(response =>
            {
                res.status(200).json({message:"cart added successfully",carts:response});
            })
            .catch(err=>res.status(500).json({message:err}))
}

exports.getCart=(req,res,next)=>
{
    cartData.find()
    .then(response =>
        {
            res.status(200).json({message:"cart added successfully",carts:response});
        })
        .catch(err=>res.status(500).json({message:err}))
   
}