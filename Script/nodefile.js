const express=require("express")
const app=express()
var mongoose=require("mongoose")
var parser = require('body-parser');
var Schema=mongoose.Schema
const path=require("path")
const router = express.Router();
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.
app.use('/', router);
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
//app.set('views',path.join(_dirname,'\'));
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost/db_name")

let Users=new Schema({
  Name:String,
  Username:String,
  Password:String,
})
var users=mongoose.model("users",Users)

let ActiveUser=new Schema({
  Username:String,
})
var users=mongoose.model("activeuser",ActiveUser)

router.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/views/register.html'));
});












app.get("/activeuser",(req,res)=>
{
activeuser.find({},function(err,docs){
  console.log(docs)
  res.send(docs)
})
})

app.get("/users",(req,res)=>
{
users.find({},function(err,docs){
  console.log(docs)
  res.send(docs)
})
})

app.listen(5001);
