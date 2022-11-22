const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const ejs=require("ejs");
const { stringify } = require("querystring");
const path=require('path');

const app=express();
app.set('view engine','ejs');

mongoose.connect({mongoUrl},{useNewUrlParser:true});

const futureClientSchema=new mongoose.Schema({
    name:String,
    email:String,
    projectDetail:String
});

const futureClient=mongoose.model('futureClient',futureClientSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public',express.static(path.join(__dirname,'public')));

app.get("/portfolio-Kushal",function(req,res){
    res.render("index");
}) 

app.post("/portfolio-Kushal",function(req,res){
    const obj=new futureClient({
        name:req.body.name,
        email:req.body.email,
        projectDetail:req.body.projectDetail
    });
    obj.save();
    console.log(obj);
    console.log(req.body.projectDetail);
    res.redirect("/portfolio-Kushal");
}) 

app.post("/Newsletter",function(req,res){
    const obj=new futureClient({
        name:"Newsletter",
        email:req.body.newsEmail,
        projectDetail:"want to update about Kushal's Project"
    });
    obj.save();
    console.log(obj);
    res.redirect("/portfolio-Kushal");
}) 

app.listen(process.env.PORT||4000, function() {
    console.log("Server started on port 4000");
});





