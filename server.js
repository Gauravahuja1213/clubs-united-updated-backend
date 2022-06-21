//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const app=express();
var cors = require('cors')
app.use(bodyParser.json());
app.use(cors())
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://gauravahuja1213:Paytm%40123@cluster0.sph1xvr.mongodb.net/detailsDB",{ useNewUrlParser : true});


const detailsSchema= new mongoose.Schema({
    name:String,
    email:String,
    query:String
    });
const Detail= new mongoose.model("Detail",detailsSchema);
    

app.use(bodyParser.urlencoded({extended: true}));


app.post("/register",function(req,res){
    const {name,email,query}=req.body;
    const user=new Detail({
        name,
        email,
        query
    })
    console.log(req.body);
    user.save(err=>{
        if(err){
            res.send(err)
        }
        else{
            res.send({message:"Query Submitted"})
        }
    })
})

app.listen(process.env.PORT ||9002,function(){
    console.log("Server Started On Port 9002")
});