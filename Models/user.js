var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema=new Schema(
    {
       email:{type:String,required:true},
       firstName:{type:String,required:true},
       lastName:{type:String},
       password:{type:String,required:true},
       address:{type:String},
       orders:{type:Array},
       orders_original:{type:Array}
    }
);

module.exports=mongoose.model("user",userSchema);
