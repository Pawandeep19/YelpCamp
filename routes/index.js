var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user.js");

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
    var registeredUser=new User({username:req.body.username});
    User.register(registeredUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("loginPage.ejs");
        }
        passport.authenticate("local")(req,res,function(){
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