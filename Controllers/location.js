const locationData=require("../Models/location");

exports.getLocation=(req,res,next)=>
{
    
    locationData.find()
        .then(response =>
            {
                res.status(200).json({locations:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}