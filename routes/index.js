var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user.js");
var nodemailer = require('nodemailer');
require('dotenv').config();

//node mailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});
  
var mailOptions = {
    from: 'process.env.EMAIL',
    to: '',
    subject: 'Welcome to YelpCamp!',
    html: '<h1>Dear user,</h1><p>Thank You! You are successfully registered to the YelpCamp.<br> Please go and explore our beautiful website and feel free to drop suggestions / queries at : pawanyelpcamp@gmail.com <br>Website link: http://pawan-yelp-camp.herokuapp.com/ </p><p>Regards <em>Pawandeep Singh</em> </p>'        
};

//nodemailer ends
      
  
//home route
router.get("/",function(req,res){
    res.render("landingPage.ejs");
});

//==========
//Auth routes
//==========


//register form
router.get("/register",function(req,res){
    res.render("loginPage.ejs");
});

//register form submitted to
router.post("/register",function(req,res){
    var registeredUser=new User({username:req.body.username,email:req.body.emailAdress});
    User.register(registeredUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("loginPage.ejs");
        }
        passport.authenticate("local")(req,res,function(){

           //send mail
           mailOptions.to=registeredUser.email+', '+process.env.EMAIL;
           transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
            });

            //redirect
             res.redirect("/campground");

        });
    });
});

//==========
//Login routes
//==========

router.get("/login",function(req,res){
    res.render("loginPage.ejs");
});
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campground",
    failureRedirect:"/login"
}),function(req,res){
});

//=====
//log out
//=====
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campground");
});


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports=router;