//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");



//default content for pages
const homeStartingContent = "Kaushalvel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";





//initialising express
const app = express();




//initialising ejs for template
app.set('view engine', 'ejs');




//setting usie parameters for express css and body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




//connecting to mongoDB
mongoose.connect("mongodb+srv://admin-rocketcodes:mzmschool@cluster1.v0l1hp9.mongodb.net/blogDB");




//creating the schema for post

const postSchema = mongoose.Schema({
  title:String,
  content:String
});





// creating the model
const Post = mongoose.model("Post",postSchema);





//Homepage


app.get("/",function(req,res){


Post.find({},function(err,posts){
  if(!err){
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
  }
});

});





//contact page
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});





//about page
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});





//compose page
app.get("/compose",function(req,res){
  res.render("compose");
});



//add new post to website
app.post("/compose",function(req,res){
const post = new Post ({
  title : req.body.postTitle,
  content : req.body.postBody
});

post.save();

res.redirect("/");
});





//get post by id
app.get("/posts/:postID",function(req,res){
  let chk = (req.params.postID);

  

  Post.findOne({_id:chk},function(err,post){
    if(!err){
      res.render("post",{postTitle:post.title,postBody:post.content});
     
    }


  });

});





//delete page
app.get("/delete",function(req,res){
  Post.find({},function(err,posts){
    if(!err){
      res.render("delete",{posts:posts});
    }
  });
});



//delete from database

app.post("/delete",function(req,res){
  const toDelete = req.body.delete;

  Post.findByIdAndRemove({_id:toDelete},function(err){
    if(err){
      console.log(err);
    }

    else{
      console.log("Items Removed");
      res.redirect("/delete");
    }
  });
});



app.get("/:topic",function(req,res){
  const err2 = (req.params.topic);

  if(err2 != "compose" || err2 != "contact"||err2 != "about"){
    res.render("error");
  }
});

app.listen(process.env.PORT||3000,function(){
  console.log("Server started......");
});
