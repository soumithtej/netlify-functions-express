var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var tileSchema=new Schema(
    {
        location_id:{type:String},
        restaurant_id:{type:String},
        name:{type:String},
        city:{type:String},
        min_price:{type:String},
        mealtype_id:{type:String,required:true},
        mealtype:{type:String},
        cuisine_id:{type:String},
        cuisine:{type:String},
        image:{type:String}
    }
);

module.exports=mongoose.model("tile",tileSchema);
