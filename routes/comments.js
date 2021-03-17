var express=require("express");
var router=express.Router({mergeParams:true});
var campG=require("../models/campgrounds.js");
var Comment=require("../models/comments.js");




//=================
//comments route
//================

//new comment form
router.get("/new",isLoggedIn,function(req,res){
    campG.findById(req.params.id,function(err,foundcamp){
        if(err){
            console.log(err);
        } else{
            res.render("comments/newComment.ejs",{foundcamp:foundcamp});
        }
    });
    
});


//creating new comment
router.post("/",isLoggedIn,function(req,res){
    campG.findById(req.params.id,function(err,foundcamp){
        if(err){
            console.log(err);
            res.redirect("/campground");
        } else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.username=req.user.username;
                    comment.author.id=req.user._id;
                    comment.save();
                    foundcamp.comments.push(comment);
                    foundcamp.save();
                    res.redirect("/campground/"+req.params.id);
                }
            });
        }
    });
});


//edit comment
router.get("/:comments_id/edit",checkownership,function(req,res){
    Comment.findById(req.params.comments_id,function(err,foundcomment){
           if(err){
            console.log(err);
           } else{
            res.render("comments/editComment.ejs",{foundcomment:foundcomment,foundCampId:req.params.id});
           }
    });
});
router.put("/:comments_id",checkownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comments_id,req.body.editedcomment,function(err,foundcamp){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campground/"+req.params.id);
        }
    });
});

//delete comment
router.delete("/:comments_id",checkownership,function(req,res){
    Comment.findByIdAndRemove(req.params.comments_id,function(err,deletedcamp){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

//middleware for checking that user owns the comment
function checkownership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id,function(err,foundcomment){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundcomment.author.id.equals(req.user._id)){ //we have to do equals instead of==
                    //because foundcomment is an object and req.user._id is a string
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