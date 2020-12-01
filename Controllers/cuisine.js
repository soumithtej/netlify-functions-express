var cuisineData=require("../Models/restaurant");

exports.getRestByCuisineId=(req,res,next)=>
{
    const cuisine_id=req.params.cuisine_id;
    //const payload={cuisine_id:cuisine_id};
  
    cuisineData.find({cuisine: {$elemMatch: {id:cuisine_id}}})
        .then(response =>
            {
                res.status(200).json({restaurants:response.map(item=>item.cuisine.filter(item2=>item2.id == cuisine_id))});
            })
        .catch(err=>
            {
                console.log(err)
            })
    
}
 