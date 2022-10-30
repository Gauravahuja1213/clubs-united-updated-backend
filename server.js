//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors());
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://gauravahuja1213:Paytm%40123@cluster0.sph1xvr.mongodb.net/clubsDB",{ useNewUrlParser : true});

const detailsSchema= new mongoose.Schema({
    name:String,
    email:String,
    query:String
    });
const Detail= new mongoose.model("Detail",detailsSchema);
    
const adminlogindetailsSchema= new mongoose.Schema({
    email:String,
    password:String
    });
const Adminlogindetail= new mongoose.model("Adminlogindetail",adminlogindetailsSchema);

const signupdetailsSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    repassword:String
    });
const Signupdetail= new mongoose.model("Signupdetail",signupdetailsSchema);

app.use(bodyParser.urlencoded({extended: true}));


app.post("/contact",function(req,res){
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

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/admin",(req,result)=>{
    Detail.find((err,val)=>{
        if(err){
            console.log(err)
        }else{
            result.send(val)
        }
    })
})

app.post("/administrator",function(req,res){
    const {email,password}=req.body;
    Adminlogindetail.findOne({email:email},(err,user7)=>{
        if(user7){
        
            if(password===user7.password){
                        res.send({message:"Welcome Gaurav Ahuja"})
                    }
        
            else{
                res.send({message:"Password didn't match"})
            }
        }else{
            res.send({message:"You are not an admin.Please login as User!!"})
        }
    })
})

app.post("/login",function(req,res){
    const {email,password}=req.body;
    Signupdetail.findOne({email:email},(err,user5)=>{
        if(user5){
        
            if(password===user5.password){
                        res.send({message:"Login Successfull",user5:user5})
                    }
        
            else{
                res.send({message:"Password didn't match"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    })
})

app.post("/signup",function(req,res){
    const {name,email,password,repassword}=req.body;
    Signupdetail.findOne({email:email},(err,user4)=>{
        if(user4){
            res.send({message:"User already registered"})
        }
        else{
            const user3=new Signupdetail({
                name,
                email,
                password,
                repassword
            })
            user3.save(err=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send({message:"Signup Successful, Login Now!!"})
                }
            })
        }
    })
    
    
})


app.listen(process.env.PORT ||9002,function(){
    console.log("Server Started On Port 9002")
});