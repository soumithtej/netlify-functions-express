const userData=require("../Models/user");
const { getRestByLocation } = require("./restaurant");

exports.getUser=(req,res,next)=>
{
    const email=req.body.email;
    const password=req.body.password;
    const payload={email:email,password:password};

    userData.find(payload)
        .then(response =>
            {
               if (response.length >= 1)
                res.status(200).json({users:response});
                else
                {
                    res.status(200).json({isAuthenticated:false});
                }
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}

exports.createUser=(req,res,next)=>
{
    const email=req.body.email;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName ? req.body.lastName : undefined;
    const password=req.body.password;
    const newUser=new userData({email:email,firstName:firstName,lastName:lastName,password:password});

    newUser.save()
    .then(response =>
        {
            res.status(200).json({message:"user added successfully",users:response});
        })
        .catch(err=>res.status(500).json({message:err}))
   
}

exports.checkUser=(req,res,next)=>
{
    const email=req.body.email;
    const payload={email:email};

    userData.find(payload)
        .then(response =>
            {
               if (response.length >= 1)
                res.status(200).json({users:response});
                else
                res.status(200).json({users:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}

exports.userCart=(req,res,next)=>   //inserting elements into array or creating array
{
    const food_id=req.body.food_id;
    const food_name=req.body.food_name;
    const cost=req.body.cost;
    const item_cost=Number(req.body.item_cost);
    const qty=req.body.qty;
    const restaurant_id=req.body.restaurant_id;
    const restaurant=req.body.restaurant;
    const email=req.body.email;

    userData.update({email:email},
        {$push: {orders: {
            food_id:food_id,
            food_name:food_name,
            item_cost:item_cost,
            cost:cost,
            qty:qty,
            restaurant_id:restaurant_id,
            restaurant:restaurant
        } 
    }})
    .then(response =>
        {
            res.status(200).json({users:response});
        })
        .catch(err=>res.status(500).json({message:err}))   
}

exports.getUserCartDetails=(req,res,next)=>
{
    const email=req.body.email;

    userData.find({email:email})
        .then(response =>
            {
                res.status(200).json({orders:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}

exports.deleteCartItem=(req,res,next)=>     //deleting items in an array or deleting array
{
    const food_id=req.body.food_id;
    const food_name=req.body.food_name;
    const cost=req.body.cost;
    const qty=req.body.qty;
    const email=req.body.email;
    const item_cost=Number(req.body.item_cost);

    userData.update({email:email},{$pull: {orders: {food_id:food_id,item_cost:item_cost}} } )
    .then(response =>
        {
            res.status(200).json({users:response});
        })
        .catch(err=>res.status(500).json({message:err}))   
}

//increasing or decreasing qty

exports.updateQty=(req,res,next)=>  //updating values in an array
{
    const email=req.body.email;
    const food_id=req.body.food_id;
    const item_cost=Number(req.body.item_cost);
    const inc=req.body.inc ? req.body.inc : 0;
    const dec=req.body.dec ? req.body.dec : 0;
    const qty=req.body.qty;
    const qty2=qty+inc;
    const qty3=qty-dec;
    const cost2=qty2 * item_cost;
    const cost3=qty3 * item_cost;
    
    if (inc == 1)
    {
    userData.update( { email:email, orders: {$elemMatch: {food_id: food_id,item_cost:item_cost}} },
        { $set: { "orders.$.qty" : qty2, "orders.$.cost" : cost2 } }
     )
     .then(response =>
        {
            userData.find({email:email})
        .then(response2 =>
            {
                res.status(200).json({orders:response2});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
            //res.status(200).json({orders:response});
        })
        .catch(err=>res.status(500).json({message:err}))   
    }
    else if (dec == 1)
    {
        userData.update( { email:email, orders: {$elemMatch: {food_id: food_id,item_cost:item_cost}} },
            { $set: { "orders.$.qty" : qty3, "orders.$.cost" : cost3 } }
         )
         .then(response =>
            {
                userData.find({email:email})
                .then(response2 =>
                    {
                        res.status(200).json({orders:response2});
                    })
                .catch(err=>
                    {
                        res.status(500).json(err);
                    })
               // res.status(200).json({orders:response});
            })
            .catch(err=>res.status(500).json({message:err}))   
    }  

}

exports.getFoodById=(req,res,next)=>    //finding the required element in an array
{
    const food_id=req.body.food_id;
    const item_cost=req.body.item_cost;
    const email=req.body.email;
  
    userData.find({orders: {$elemMatch: {food_id:food_id,item_cost:item_cost}},email:email})
        .then(response =>
            {
                res.status(200).json({orders:response.map(item=>item.orders.filter(item2=>item2.food_id == food_id && item2.item_cost == item_cost))});
                //res.status(200).json({restaurants:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
    
}

exports.addToOrders=(req,res,next)=>
{
    const food_id=req.body.food_id;
    const food_name=req.body.food_name;
    const cost=req.body.cost;
    const item_cost=Number(req.body.item_cost);
    const qty=req.body.qty;
    const restaurant_id=req.body.restaurant_id;
    const restaurant=req.body.restaurant;
    const dateAndTime=req.body.dateAndTime;
    const email=req.body.email;

    userData.update({email:email},
        {$push: {orders_original: {
            food_id:food_id,
            food_name:food_name,
            item_cost:item_cost,
            cost:cost,
            qty:qty,
            restaurant_id:restaurant_id,
            restaurant:restaurant,
            dateAndTime:dateAndTime
        } 
    }})
    .then(response =>
        {
            res.status(200).json({users:response});
        })
        .catch(err=>res.status(500).json({message:err}))   
}

