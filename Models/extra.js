var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var extraSchema=new Schema(
    {
        location_id:{type:String},
        restaurant_id:{type:String},
        name:{type:String},
        city:{type:String},
        price:{type:Number},
        mealtype_id:{type:String,required:true},
        mealtype:{type:String},
        cuisine_id:{type:String},
        cuisine:{type:String}
    }
);

module.exports=mongoose.model("extra",extraSchema);
