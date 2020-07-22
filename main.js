//require statements
var PORT = process.env.PORT || 3000 ;
const express=require("express");
var mongoose=require("mongoose");
const path=require("path");
var bodyParser = require('body-parser');
var session = require('client-sessions');

//assign variables
const app=express();
const router = express.Router();
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/Script'));
app.use('/', router);
app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// get requests to html pages


app.get('/wishlist',function(req,res){
  res.sendFile(path.join(__dirname+'/views/wishlist.html'))
})

router.get('/orders',function(req,res){
  res.sendFile(path.join(__dirname+'/views/orders.html'));
});

router.get('/orderplaced',function(req,res){
  res.sendFile(path.join(__dirname+'/views/orderplaced.html'));
});

router.get('/listproducts',function(req,res){
  res.sendFile(path.join(__dirname+'/views/listproducts.html'));
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/listproducts.html'));
});

app.get('/login',function(req,res){
    res.render('login',{
    });
    console.log('user accessing login page');
});

router.get('/page11',function(req,res){
  res.sendFile(path.join(__dirname+'/views/page11.html'));
});

app.get('/register',function(req,res){
    res.render('register',{
        topicHead : 'Register',
    });
    console.log('user accessing register page');
});



// mongoose connection stuff
mongoose.connect("mongodb://localhost/lineupX",{ useNewUrlParser: true });
var db=mongoose.connection;
var Schema=mongoose.Schema;
mongoose.set('useFindAndModify', false);

//  array cart
var Cart=new Schema({
  User:String,
  Id:String,
  Name:String,
  Price:Number,
  Quantity:Number,
})
var cart=mongoose.model("cart",Cart);

app.post('/addToCart',(req,res)=>
{
  console.log(req.body);
  var myData=new cart();
  myData.User=req.body.user;
  myData.Id=req.body.id;
  myData.Name=req.body.name;
  myData.Price=req.body.price;
  myData.Quantity=req.body.quantity;
  myData.save(function(err)
  {
  //body ..
  if(!err)
  {
    console.log("Data Saved");
    console.log(myData);
  }
  else {
    console.log(err)
  }
  })
    return res.redirect('listproducts');
})

app.get('/getcart',(req,res)=>
{
  cart.find({User:req.query.user},function(err,docs)
{
  res.send(docs);
})
})

app.get('/checkquantity',(req,res)=>
{
  products.findOne({_id:req.query.id},function(err,docs)
{
  if(!err)
  {
    console.log('\tcheck quantity\t',docs.Quantity,'\n');
    res.send(docs);
  }
});
})

app.post('/removeFromCart',(req,res)=>
{
  console.log(req.body);
  filter={_id:req.body.id};
  cart.findOneAndDelete(filter,function(err)
{
  if(!err)
  {
    console.log('Cart product deleted!');
  }
})
})

app.get('/checkPrevEntry',(req,res)=>
{
  console.log('check prev entry sent data is',req.query);
  filter={Id:req.query.id,User:req.query.user};
  cart.findOne(filter,function(err,docs){
    console.log('checkprev entry',docs);
    if(docs==null)
    {
      res.send({Name:null});
    }
    else {
      res.send(docs);
    }
  })
})

app.post('/removeOldEntry',(req,res)=>
{
  filter={_id:req.body.id};
  cart.findOneAndDelete(filter,function(err)
{
  if(!err)
  {
    console.log("Entry deleted!");
  }
  else {
    console.log('error',err);
  }
})
})

// array users
var User=new Schema({
  Name:String,
  Username:String,
  Password:String,
//  Password1:String,
})
var users=mongoose.model("users",User);
app.post('/registerform',(req,res)=>
{
  console.log('body \t',req.body);
  var myData=new users();
  myData.Name=req.body.name;
  myData.Username=req.body.username;
  myData.Password=req.body.password;
  myData.save(function(err)
{
  //body ..
  if(!err)
  {
    console.log("Data Saved");
    console.log(myData);
    res.redirect('/listproducts');
  }
  else {
    console.log(err)
  }
})
})
app.get('/actualpassword',(req,res)=>
{
  usernameSent=req.query.username;
  console.log("Username ",usernameSent);
  users.findOne({Username:usernameSent},function(err,docs)
{
  console.log('user found is\t',docs);
  if(docs==null)
  {
    res.send({Password: ""});
  }
  else {
    console.log("Actual Password ",docs.Password);
    res.send(docs);
  }
})
})

app.get('/users',(req,res)=>
{
  users.find({},function(err,docs)
{
  res.send(docs);
})
})

app.get('/checkUsername',(req,res)=>
{
  inputUsername=req.query.username;
  console.log('username to check is\t',inputUsername);
  users.findOne({Username:inputUsername},function(err,docs)
{
  if(docs==null)
  {
    console.log('Username is Unique!');
    res.send({Username:null});
  }
  else {
    console.log('username already present\t',docs);
    res.send(docs);
  }
})
})

app.get('/checkUsername',(req,res)=>
{
  console.log('logging out');
  req.session.reset();
})

app.post('/loginpost', function(req, res) {
        req.session.user = req.body.user;
        console.log('session user is ',req.session.user);
        res.redirect('/listproducts');

});
app.get('/logout',function(req,res){
  console.log('logging out!');
  req.session.reset();
res.redirect('/login');
});
// array products
var Products=new Schema({
  Name:String,
  Description:String,
  Price:Number,
  Quantity:Number,
})
var products=mongoose.model("products",Products);
var productNumber=1;
app.get('/main',(req,res)=>
{
  products.find().sort({_id:-1}).limit(1).exec(function(err, docs) {
  productNumber=docs._id
  console.log(productNumber);
  console.log('latest entry   ',docs);
  res.redirect('/page11');
});
});

app.post('/addProduct',(req,res)=>
{
  /*products.find().sort({Number:-1}).limit(1).exec(function(err, docs) {
    var productNumber=docs._id;
    console.log('latest entry   ',docs);
  });*/
  console.log(req.body);
  console.log('product number ',productNumber);
  var myData=new products();
    myData.Name=req.body.Name;
    myData.Description=req.body.Descp;
    myData.Price=req.body.Price;
    myData.Quantity=req.body.Quantity;
  myData.save(function(err)
{
  //body ..---
  console.log(myData);
  res.redirect('/page11');
})
})
app.get('/products',(req,res)=>
{
  console.log('skip and limit is',req.query);
  skipno=parseInt(req.query.since);
  limitno=parseInt(req.query.per_page);
  products.find({},null,{skip:skipno,limit:limitno},function(err,docs)
{
 //console.log('database products are',docs);
  res.send(docs);
});
})

app.get('/getToBeEditedProduct',(req,res)=>
{
  products.findOne({_id:req.query.number},function(err,docs)
{
  if(!err)
  {
    res.send(docs);
  }
});
})

app.post('/editProduct',(req,res)=>
{
  console.log('req sent is\n',req.body);
  filter={_id:req.body.number};
  update={Name:req.body.name,Description:req.body.descp,Price:req.body.price,Quantity:req.body.quantity};
  products.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    console.log("Hooray!");
    //res.redirect('/page11');
  }
});

})

app.post('/deleteProduct',(req,res)=>{
  console.log('delete product body is\t',req.body);
  filter={_id:req.body.number};
  products.findOneAndDelete(filter,function(err,docs)
{
  res.redirect('/page11');
});
})

app.post('/updateProductDatabase',(req,res)=>
{
  console.log(req.body);
  filter={_id:req.body.id};
  update={Quantity:req.body.quantity};
  products.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    console.log("Quantity updated!");
    //res.redirect('/page11');
  }
});
})

app.get('/getProductCount',(req,res)=>
{
  products.countDocuments(function(err,docs)
{
  console.log(docs);
  res.send({count2:docs})
})
})


var totalPrice;
app.post('/pay',(req,res)=>{
console.log('req is ',req.body);
  totalPrice=req.body.totalPrice;
  console.log('total price is ',totalPrice);
  console.log('items are',req.body.items);
  var items=new Array();
  console.log('the ',typeof(items),' is ',items);
  var itemslist=req.body.items.split('#');
  console.log('the ',typeof(itemslist),' is ',itemslist);
  let l=(itemslist.length-1)/5
  for(let i=0;i<l;i++){
    let itemobj={
      "name": itemslist[(i*5)+0],
      "sku": itemslist[(i*5)+1],
      "price": itemslist[(i*5)+2],
      "currency": itemslist[(i*5)+3],
      "quantity": itemslist[(i*5)+4],
    }
    console.log('the ',typeof(itemobj),' is ',itemobj);
    items.push(itemobj);
  }
console.log(items,typeof(items));
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:5555/success",
        "cancel_url": "http://localhost:5555/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": items
        },
        "amount": {
            "currency": "USD",
            "total": parseInt(totalPrice)
        },
        "description": "This is the payment description Buy an apple."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log('error',error);
        res.send('error has occured!');
    } else {
      console.log('create payement');
        for(let i=0;i<payment.links.length;i++){
          if(payment.links[i].rel==='approval_url'){
            console.log('payment created!');
            console.log(payment.links[i].href);
            res.redirect(payment.links[i].href);

          }
        }
    }
});


});

var Orders=new Schema({
  User:String,
  PaymentId:String,
  Amount:String,
  Items:Object,
  Time : { type : Date, default: Date.now },

})

var orders=mongoose.model("orders",Orders);

app.get('/success',(req,res)=>{
  console.log('successfully redirected');
  const payerid = req.query.PayerID;
  const paymentid = req.query.paymentId;
console.log(req.query);
const execute_payment_json = {
  'payer_id' :payerid,
  'transactions': [{
    'amount':{
      'currency':'USD',
      'total': parseInt(totalPrice)
    }
  }]
};

paypal.payment.execute(paymentid,execute_payment_json,function(error,payment){
  if(error){
    console.log(error.response);
    throw error;
  }
  else {
    console.log('get payment response');
    console.log(JSON.stringify(payment));
    console.log(typeof(payment));
    x=payment['transactions'][0]['item_list']['items'];
    console.log(x);

    /*res.redirect(url.format({
           pathname:"/deleteProduct",
           query:req.query,
         });
     });
*/

var myData=new orders();
console.log('session user is ',req.session.user);
  myData.User=req.session.user;
  myData.PaymentId= req.query.paymentId;
  myData.Amount=execute_payment_json['transactions'][0]['amount']['total'];
  myData.Items=x;

myData.save(function(err)
{
//body ..---
console.log(myData);
    res.redirect('/orderplaced');
})


    //redirect to delete Products
  }
});

});

app.get('/cancel',(req,res)=>res.send('cancelled'));

app.get('/getOrderNumber',(req,res)=>
{
  console.log('user is ',req.query.user,'session user is ',req.session.user);
  orders.findOne({User:req.query.user},function(err,docs)
{
  if(!err)
  {
    console.log('the order is ',docs);
    res.send(docs);
  }
}).sort({Time: -1});
});

app.get('/getOrders',(req,res)=>
{
  console.log('skip and limit is',req.query);
  skipno=parseInt(req.query.since);
  limitno=parseInt(req.query.per_page);
  orders.find({User:req.session.user},null,{skip:skipno,limit:limitno},function(err,docs)
{
 //console.log('database products are',docs);
  res.send(docs);
});
})

app.get('/getOrderCount',(req,res)=>
{
  products.countDocuments({User:req.session.user},function(err,docs)
{
  console.log(docs);
  res.send({count2:docs})
})
})

app.get('/getSearch',(req,res)=>{
  products.find({Name:{ $regex : new RegExp(req.query.input, "i") }},function(err,docs){
    if(err){
      console.log(err);
    }
    else{
    console.log(docs);
    res.send(docs);
    }
  })
})

app.listen(3000); 
