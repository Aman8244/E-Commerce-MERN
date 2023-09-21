const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require("bcrypt");
const saltRound = 5;
const jwt = require("jsonwebtoken");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1/shoppingAppData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  })
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const productSchema = new mongoose.Schema({
        id:Number,
        title:String,
        description:String,
        price:Number,
        category:String,
        image:String,
        rating:{
            rate:Number,
            count:Number
        }
});

const userSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  username:{
    type:String,
    unique:true,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:String
})
const cartItemSchema = new mongoose.Schema({
  id:String,
  title:String,
  price:Number,
  image:String,
  discountPercentage:Number,
  productId:String,
  quantity:{
    type:Number,
    default:1
  }
})
const cartSchema = new mongoose.Schema({
        username:{
          type:String,
          ref:'UserData',
          required:true
        },
        items:[cartItemSchema]
})
const orderHistory = new mongoose.Schema({
  username:String,
  items:[{
    title:String,
    orderDate:String,
    orderReceived:String,
    price:String,
    productId:String,
    image:String
  }]
})

const SecretKey = process.env.SECRETKEY;

const Product = mongoose.model('product', productSchema);
const UserData = mongoose.model('userdata',userSchema);
const CartData = mongoose.model('cartdata',cartSchema);
const OrderHistory = mongoose.model('orderhistory',orderHistory);



const verifyToken = (req,res,next)=>{
  const authHeader = req.headers['authorization'];
  const Bearer = authHeader.split(' ');
  const token = Bearer[1];
  
  if (token == null) {
    return res.send({
      message:"No Token!",
      status:401
    });
  }

  jwt.verify(token, SecretKey, (err, user) => {
    if (err) {
      return res.send({
        message:"Invalid Token",
        status:401
      });
    }
    req.user = user;
    next();
  });
}
app.get("/",(req,res)=>{
    const productdata = Product.find({})
    productdata.then(data=>{
       res.json(data)
    }).catch(err=>{
        console.log(err)
    })
    
})

app.get("/cart",verifyToken,(req,res)=>{
  CartData.findOne({username:req.user.username}).then(result=>{
      res.send(result);
  })
})

app.post("/cart",verifyToken,(req,res)=>{
  CartData.findOne({username:req.user.username}).then(result=>{
      if(result===null || result === undefined){
        new CartData({
          username:req.user.username,
          items:[
            {
             title:req.body.title,
             price:req.body.price,
             image:req.body.image,
             discountPercentage:req.body.discountPercentage,
             productId:req.body.productId
            }
          ]
        }).save();
      }
      else{
         CartData.updateOne({username:req.user.username},
          {$push:{items:req.body}},{upsert:true}).then(updatedCart=>{
            res.send({
              message:updatedCart,
              status:200
            })
          })

      } 
  })
  
})

app.put("/cart/update/:cartId",(req,res)=>{
  const { cartId } = req.params;
  const { quantity } = req.body;
  CartData.findOneAndUpdate( { "items._id": cartId },
  { $set: { "items.$.quantity": quantity } },
  { new: true }).then((response)=>{
       res.send(response)
  })
})

app.get("/api/products/:productId",(req,res)=>{
    const productId = req.params.productId;
    Product.findOne({_id:productId}).then(result=>{
        res.send(result);
       
    })
})

app.post("/cart/delete",verifyToken,(req,res)=>{
  CartData.findOneAndUpdate({username:req.user.username},{
    $pull:{
      items:{
        title:req.body.title
      }
    }
  },{new:true}).then(updatedCart=>{
    if(!updatedCart){
      console.log("cart empty");
    }
    else{
      res.sendStatus(200)
    }
  }) 
})

app.get("/emptyCart",verifyToken,(req,res)=>{
   CartData.findOneAndDelete({username:req.user.username}).then(()=>{
    res.send({
      status:200,
      message:"Cart is empty"
    })
   })
})

app.post("/login",(req,res)=>{
  let username=req.body.username;
  let currentPassword= req.body.password;
  UserData.findOne({username:username}).then((result)=>{
     if(!result){
      res.status(401)
     }
     else{
      bcrypt.compare(currentPassword,result.password,(err,result)=>{
        if(result){
          const token = jwt.sign({username:req.body.username},SecretKey,{expiresIn:"24h"})
          res.json({
            status:200,
            message:"user authenticated successfully",
            token
          })
        }
        else{
          res.json({
            status:401,
            message:"user not authenticated"
          })
        }
      })
     }
      
  })
  
})
app.post("/register",(req,res)=>{
  UserData.findOne({username:req.body.username}).then(result=>{
    if(result){
      res.send({
        status:401,
        message:"Username Is already been taken!"
      })
    }
    else{
      bcrypt.hash(req.body.password,saltRound,(err,hash)=>{
        if(err){
         console.log(err);
         res.send({
          status:401,
          message:"System Error try again"
         })
        }
        else{
         const newUser = new UserData({
           username:req.body.username,
           firstname:req.body.firstName,
           lastname:req.body.lastName,
           email:req.body.email,
           password:hash
         })
         newUser.save();
         const token = jwt.sign({username:req.body.username},SecretKey,{expiresIn:"10h"})
         res.json({
          status:200,
           message:"user is registered.",
           token
         });
        }
     })
    }
  })
  
  
})
app.post("/product/search",(req,res)=>{
  Product.find({$or:[
    {category:{$in:[req.body.searchItem]}},
    {brand:{$in:[req.body.searchItem]}},
    {title:{$in:[req.body.searchItem]}},
    {description:{$in:[req.body.searchItem]}}
  ]}).then(result=>{
    res.send(result);
  })
})

app.get("/deals",(req,res)=>{
  Product.find({discountPercentage:{$gt:15}}).then(result=>{
    res.send(result);
  })
})

app.get("/userDetails",verifyToken,(req,res)=>{
  UserData.findOne({username:req.user.username}).then(result=>{
    res.send({
      name:result.firstname+" "+result.lastname,
      username:result.username,
      email:result.email
    });
  })
})
app.post("/userDetails",verifyToken,(req,res)=>{
  if(!req.body.prevPassword){
    UserData.findOneAndUpdate({username:req.user.username},req.body,{new:true}).then(updatedProfile=>{
      if(!updatedProfile){
        console.log("error occured")
      }
      else{
        res.send({
          message:"updated profile Successfully",
          status:200
        })
      }
    })
  }
  else{
    UserData.findOne({username:req.user.username}).then(result=>{
      bcrypt.compare(req.body.prevPassword,result.password,(err,result)=>{
        if(result){
          bcrypt.hash(req.body.newPassword,saltRound,(err,hash)=>{
              if(err){
                  res.send({
                    message:"system error",
                    status:500
                  })
              }
              else{
                UserData.findOneAndUpdate({username:req.user.username},{password:hash},{new:true}).then(updatedProfile=>{
                  if(!updatedProfile){
                    res.send({
                      message:"system error",
                      status:500
                    })
                  }
                  else{
                    res.send({
                      message:"Password Changed Successfuly",
                      status:200
                    })
                  }
                })
              }
          })
        }
        else{
          res.json({
            status:401,
            message:"old password entered is wrong!!"
          })
        }
      })
      
    })
  }
})
app.get("/orderHistory",verifyToken,(req,res)=>{
    OrderHistory.find({}).then(result=>{
      res.send(result);
    })
})
app.post("/orderHistory",verifyToken,(req,res)=>{
  OrderHistory.findOne({username:req.user.username}).then(result=>{
    if(result===null || result === undefined){
      new OrderHistory({
        username:req.user.username,
        items:req.body.data,  
      }).save();
    }
    else{
      OrderHistory.findOne({username:req.user.username}).then(result=>{
        if(result.items.length>0 && result.items.length){
           OrderHistory.updateOne({username:req.user.username},
          {$set:{items:[...req.body.data,...result.items]}},{upsert:true}).then(updatedCart=>{
            console.log(updatedCart)
          })
        }
        else{
           OrderHistory.updateOne({username:req.user.username},
          {$set:{items:req.body.data}},{upsert:true}).then(updatedCart=>{
            console.log(updatedCart)
          })
        }
      })
       
    } 
})
})

app.post("/",(req,res)=>{
  res.redirect("/")
})


app.listen(8000,()=>{
    console.log("port is running at 8000")
}
)