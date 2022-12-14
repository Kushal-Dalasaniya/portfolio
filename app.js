require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const ejs=require("ejs");
const { stringify } = require("querystring");
const path=require('path');

const app=express();
app.set('view engine','ejs');

// mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});

// When we use cyclic, we must first establish a mogodb connection before port listening.
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}

const futureClientSchema=new mongoose.Schema({
    name:String,
    email:String,
    projectDetail:String
});

const futureClient=mongoose.model('futureClient',futureClientSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public',express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
    res.render("index");
}) 

app.post("/portfolio-Kushal",function(req,res){
    const obj=new futureClient({
        name:req.body.name,
        email:req.body.email,
        projectDetail:req.body.projectDetail
    });
    obj.save();
    // console.log(obj);
    // console.log(req.body.projectDetail);
    res.redirect("/");
}) 

app.post("/Newsletter",function(req,res){
    const obj=new futureClient({
        name:"Newsletter",
        email:req.body.newsEmail,
        projectDetail:"want to update about Kushal's Project"
    });
    obj.save();
    // console.log(obj);
    res.redirect("/");
}) 

// app.listen(process.env.PORT||4000, function() {
//     console.log("Server started on port "+process.env.PORT);
// });

// When we use cyclic, we must first establish a mogodb connection before port listening.
connectDB().then(() => {
    app.listen(process.env.PORT||3000, function() {
      console.log("Server started on port "+process.env.PORT);
    });
})




