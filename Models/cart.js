var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var cartSchema=new Schema(
    {
       restaurant:{type:String},
       cost:{type:Number,required:true},
       food:{type:String,required:true},
       restaurant_id:{type:String,required:true},
       id:{type:String,required:true}
    }
);

module.exports=mongoose.model("cart",cartSchema);
