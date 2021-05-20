var express      =require("express"),
    app          =express(),
    bodyParser   =require("body-parser"),
    mongoose     =require("mongoose"),
    flash        =require("connect-flash"),
    campG        =require("./models/campgrounds.js"),
    seedDB       = require("./seeds.js"),
    Comment      =require("./models/comments.js"),
    User         =require("./models/user.js"),
    passport     =require("passport"),
    localStrategy=require("passport-local"),
    methodOverride=require("method-override");
    var nodemailer = require('nodemailer');
    require('dotenv').config();



app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://pawandeep19:pawan123@cluster0.xkqi0.mongodb.net/Pawan-Yelp-Database?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false ,useCreateIndex:true}).then(()=>{
    console.log("Mongodb connected");
});
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());



//passport configuration
app.use(require("express-session")({
    secret:"Pawan is the best",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//for sending username to everypage
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});


//=====
//ROutes
//=====

var campgroundRoute  =require("./routes/campground.js"),
    commentRoute     =require("./routes/comments.js");
    indexRoute       =require("./routes/index.js");


app.use("/campground",campgroundRoute);
app.use("/campground/:id/comments",commentRoute);
app.use("/",indexRoute);
//=====





//listen
app.listen(process.env.PORT || 3000,function(){
    console.log("server is starting");
});
