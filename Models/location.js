var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var locationSchema=new Schema(
    {
        location_id:{type:String},
        location:{type:String},
        restaurant_id:{type:String},
        name:{type:String},
        city:{type:String},
        min_price:{type:Number},
        mealtype_id:{type:String,required:true},
        mealtype:{type:String},
        cuisine_id:{type:String},
        cuisine:{type:String}
    }
);

module.exports=mongoose.model("location",locationSchema);
