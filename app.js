const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const appRoutes=require("./Routes/route");
const port=5000;

const app=express();

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) =>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','PATCH','DELETE');
    res.setHeader('Access-Control-Allow-Headers','content-Type,Authorization');
    next();
})
app.use("/",appRoutes);

mongoose.connect("mongodb+srv://soumithtej:SherlockHolmes_123@cluster0.q51bp.mongodb.net/testDB?retryWrites=true&w=majority",
    {useNewUrlParser:true,useUnifiedTopology:true})
    .then(res=()=>
        {
            app.listen(port,()=>
            {
                console.log("server running on port#"+port);
            })
        })
    .catch(err=>
    {
       console.log(err);
    })