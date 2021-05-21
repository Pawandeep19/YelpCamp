var express=require("express");
var router=express.Router();
var campG=require("../models/campgrounds.js");




//========
//campground routes
//========

//campgrounds page
router.get("/",function(req,res){
    campG.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campGroundPage.ejs",{campgrounds:campgrounds});
        }
    });
});



//post route of campground
router.post("/",isLoggedIn,function(req,res){
     var camp={
         name:req.body.name,
         image:req.body.image,
         description:req.body.description,
         price:req.body.price,
         map:req.body.map

     }
     campG.create(camp,function(err,camps){
         if(err){
             console.log(err);
         }
         else{
            camps.author.id=req.user._id;
            camps.author.username=req.user.username;
            camps.save();
            req.flash("success","Campground added successfully!");
            res.redirect("/campground");
         }
     });
});


//add new campgorund
router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/newCamp.ejs");
});


//more info page-show page
router.get("/:id",function(req,res){
    campG.findById(req.params.id).populate("comments").exec(function(err,foundcamp){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundcamp);
            res.render("campgrounds/showPage.ejs",{foundcamp:foundcamp});
        }
    });
    
});

//=======
//Edit routes
//=======

router.get("/:id/edit",checkownership,function(req,res){
    campG.findById(req.params.id,function(err,foundcamp){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/editPage.ejs",{foundcamp:foundcamp});
        }
    });
});

router.put("/:id",checkownership,function(req,res){
    campG.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});

//=========
//Delete
//=========
router.delete("/:id",checkownership,function(req,res){
    campG.findByIdAndDelete(req.params.id,function(err,foundcamp){
        if(err){
            res.redirect("/campground");
        } else{
            req.flash("success","Campground Deleted successfully!");
            res.redirect("/campground");
        }
    });
});

//middleware for logged in 
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You must be Logged In to that!")
    res.redirect("/login")
}

//middleware for checking that user owns the campground
function checkownership(req,res,next){
    if(req.isAuthenticated()){
        campG.findById(req.params.id,function(err,foundcamp){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundcamp.author.id.equals(req.user._id)){ //we have to do equals instead of==
                    //because foundcamp is an object and req.user._id is a string
                    next();
                } else{
                    res.send("You do not have permission to do that. Only the author can do that");
                }
            }
        });
    } else{       
        res.send("You need to login to that");
    }
}


module.exports=router;