var express      =require("express"),
    app          =express(),
    bodyParser   =require("body-parser"),
    mongoose     =require("mongoose"),
    campG        =require("./models/campgrounds.js"),
    seedDB       = require("./seeds.js"),
    Comment      =require("./models/comments.js"),
    User         =require("./models/user.js"),
    passport     =require("passport"),
    localStrategy=require("passport-local"),
    methodOverride=require("method-override");




app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/Pawan_Yelp_Camp",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false ,useCreateIndex:true});
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
seedDB();


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
app.listen(3000,function(){
    console.log("server is starting");
});
