var mongoose=require("mongoose");
var Campgrounds=require("./models/campgrounds.js");
var Comment=require("./models/comments.js");
var data=[
        {name:"manali",image:"https://www.jacadatravel.com/wp-content/uploads/2018/06/sapmi-nature-camp-tents-2.jpg",description:"We stayed at this park under Thousand Trails and loved it. The ladies in office were a lot of help. There is a special area for those with pets and those without pets. The site has a pad for your rig, you have a patio, and an area for your vehicle. Loved it! We camped at Countryside RV Resort in a Motorhome."},
        {name:"kasol",image:"https://phoenixrvpark.com/wp-content/uploads/Best-Car-Camping-Gear.jpg",description:"We stayed at this park under Thousand Trails and loved it. The ladies in office were a lot of help. There is a special area for those with pets and those without pets. The site has a pad for your rig, you have a patio, and an area for your vehicle. Loved it! We camped at Countryside RV Resort in a Motorhome."},
        {name:"kheerganga",image:"https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbXBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",description:"We stayed at this park under Thousand Trails and loved it. The ladies in office were a lot of help. There is a special area for those with pets and those without pets. The site has a pad for your rig, you have a patio, and an area for your vehicle. Loved it! We camped at Countryside RV Resort in a Motorhome."},
        {name:"kedarkantha",image:"https://i.pinimg.com/originals/2a/ab/21/2aab21b5c8b02bb13ea1da0219acb3e1.jpg",description:"We stayed at this park under Thousand Trails and loved it. The ladies in office were a lot of help. There is a special area for those with pets and those without pets. The site has a pad for your rig, you have a patio, and an area for your vehicle. Loved it! We camped at Countryside RV Resort in a Motorhome."},
        {name:"sar pass",image:"https://images.alphacoders.com/744/thumb-1920-744255.jpg",description:"We stayed at this park under Thousand Trails and loved it. The ladies in office were a lot of help. There is a special area for those with pets and those without pets. The site has a pad for your rig, you have a patio, and an area for your vehicle. Loved it! We camped at Countryside RV Resort in a Motorhome."},
        {name:"solang valley",image:"https://i.pinimg.com/originals/65/1c/28/651c284f0d10558ea90b5ae05dd81132.jpg",description:"We stayed at this park under Thousand Trails and loved it. The ladies in office were a lot of help. There is a special area for those with pets and those without pets. The site has a pad for your rig, you have a patio, and an area for your vehicle. Loved it! We camped at Countryside RV Resort in a Motorhome."}
    ];
function seedDB(){
    Campgrounds.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("campground removed");
            //add new campground
            // data.forEach(function(seed){
            //     // Campgrounds.create(seed,function(err,camp){
            //     //     if(err){
            //     //         console.log(err);
            //     //     } else{
            //     //         camp.author.username="Author";
            //     //         camp.save();
            //     //         console.log("campground added");
            //     //         // Comment.create({
            //     //         //     text:"Amazing campground must say",
            //     //         //     author:"arshdeep singh"
            //     //         // },function(err,comment){
            //     //         //     if(err){
            //     //         //         console.log(err);
            //     //         //     }
            //     //         //     else{
            //     //         //         camp.comments.push(comment);
            //     //         //         camp.save();
            //     //         //         console.log("comment added");
            //     //         //     }
                            
            //     //         // });
            //     //     }
            //     // });
            // });
        }
    });    
}

module.exports=seedDB;