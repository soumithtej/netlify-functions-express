const checkData=require("../Models/check");

exports.getLocation=(req,res,next)=>
{
    const name=req.body.name;
    const cuisine_id=req.body.cuisine_id;

    if(name)
    {
        payload={name:name};
    }
    if(cuisine_id)
    {
        payload={cuisine_id:cuisine_id};
    }
    if (name && cuisine_id)
    {
        payload={name:name,cuisine_id:cuisine_id};
    }
    checkData.find(payload)
        .then(response =>
            {
                res.status(200).json({cuisines:response});
            })
        .catch(err=>
            {
                res.status(500).json(err);
            })
}