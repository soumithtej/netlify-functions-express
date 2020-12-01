var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var restSchema=new Schema(
    {
        location_id:{type:String},
        restaurant_id:{type:String},
        name:{type:String},
        city:{type:String},
        min_price:{type:Number},
        mealtype_id:{type:String},
        mealtype:{type:String},
        cuisine_id:{type:String},
        cuisine:{type:String},
        food:{type:Array},
        qty:{type:Number}
    }
);

module.exports=mongoose.model("restaurant",restSchema);
