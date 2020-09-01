const Product = require("../models/products");
const Customer = require("../models/customers");
const Cart = require('../models/cartItems');
const Order= require('../models/orders');


module.exports.cart_delete = async (req,res) => {
  
  var id = req.params.id;
  var userinfo = res.locals.user;
  try
  {
    let usercart = await Cart.findOne({customer_id : userinfo._id});
    let cartitems = usercart.product_id_list;
    
    delete cartitems[id]
    
    let usercartupdated = await Cart.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: cartitems});
    console.log(usercartupdated);
  }
  catch(err)
  {
    console.log("Delete cart item request "+ err);
  }
  res.redirect('/cart');
}


module.exports.addtocart_get =async (req,res) => {
  console.log("In addtocart items");
  var wl = req.params.wl;
  var productId =req.params.id;
  console.log(productId);
  var userinfo=res.locals.user;

  try
  {
      let usercart = await Cart.findOne({ customer_id : userinfo._id });
      if(usercart == null)
      {
          let cartitems = {};
          cartitems[productId]= 1;
          let cp = await Cart.create({customer_id : userinfo._id , product_id_list: cartitems });
          console.log(cp);
      }
      else
      {
        console.log("User has a cart ");
          let usercart = await Cart.findOne({customer_id : userinfo._id});
          let cartitems = usercart.product_id_list;
          cartitems[productId]= 1;
          let usercartupdated = await Cart.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: cartitems});
          console.log(usercartupdated);
        }
  }
  catch(err)
  {
    console.log('error');
  }
  if(wl)
  {
    res.redirect('/wishlist');
  }
  else
  {
  res.redirect('/');
  }
}



module.exports.cart_get = async (req,res) => {
  var userinfo=res.locals.user;
  try
  {
    let usercart = await Cart.findOne({ customer_id : userinfo._id });
    if(usercart == null)
    {
      var cart =null;
      res.send("Your cart is empty");
    }
    else
    {
      var cartProductDetails =[];
      let cartitems = usercart.product_id_list;
      //console.log(cartitems);
      var totalamt=0;
      for (let item of Object.keys(cartitems))
      {
        let productDetails =await Product.findOne({id:item});
        totalamt+= parseInt(productDetails.price);
        cartProductDetails.push(productDetails); 
      }

      let userorder = await Order.create({customer_id: userinfo._id ,total_amt: totalamt , product_list :cartitems});
  
      var noOfItems = cartProductDetails.length;
    }
  }
  catch(err)
  {
    console.log(err);
  }

  res.render('cart',{prodet:cartProductDetails,totalamt,items:noOfItems});
}

