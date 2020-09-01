const Product = require("../models/products");
const Wishlist = require('../models/wishlist');



module.exports.wishlist_delete = async (req,res) => {
  
  var id = req.params.id;
  var userinfo = res.locals.user;
  var option = res.locals.mtc;
  console.log("option is " +option);

  
  try
  {
    let userwl = await Wishlist.findOne({customer_id : userinfo._id});
    let wlitems = userwl.product_id_list;
    
    delete wlitems[id]
    
    let userwlupdated = await Wishlist.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: wlitems});
    console.log(userwlupdated);
  }
  catch(err)
  {
    console.log("Delete wishlist item request "+ err);
  }


  if(option)
  {
      console.log("redirectingggg");
      res.redirect('/addtocart'+id);
  } 
  else{
    res.redirect('/wishlist');
  }
  
}


module.exports.addtowishlist_get =async (req,res) => {
  console.log("In addtowishlist items");

  var productId =req.params.id;
  console.log(productId);
  var userinfo=res.locals.user;

  try
  {
      let wlcart = await Wishlist.findOne({ customer_id : userinfo._id });
      if(wlcart == null)
      {
          let wlitems = {};
          wlitems[productId]= 1;
          let wlp = await Wishlist.create({customer_id : userinfo._id , product_id_list: wlitems });
          console.log(wlp);
      }
      else
      {
        console.log("User has a wishlist ");
          let wlcart = await Wishlist.findOne({customer_id : userinfo._id});
          let wlitems = wlcart.product_id_list;
          wlitems[productId]= 1;
          let userwlupdated = await Wishlist.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: wlitems});
          console.log(userwlupdated);
        }
  }
  catch(err)
  {
    console.log('error');
  }
  res.redirect('/');
}



module.exports.wishlist_get = async (req,res) => {
  var userinfo=res.locals.user;
  try
  {
    let userwl = await Wishlist.findOne({ customer_id : userinfo._id });
    if(userwl == null)
    {
      var wl =null;
      res.send("Your wl is empty");
    }
    else
    {
      var wlProductDetails =[];
      let wlitems = userwl.product_id_list;
      console.log(wlitems);
      var totalamt=0;
      for (let item of Object.keys(wlitems))
      {
        let productDetails =await Product.findOne({id:item});
        //totalamt+= parseInt(productDetails.price);
        wlProductDetails.push(productDetails); 
      }

  
      var noOfItems = wlProductDetails.length;
    }
  }
  catch(err)
  {
    console.log(err);
  }

  res.render('wishlist',{prodet:wlProductDetails,items:noOfItems});
}


module.exports.wishlist_movetocart = (req,res) =>{
    console.log("HEREEEEEEEEEEEEEEEEEEEE");
    let id = req.params.id;
    res.redirect('/wishlistdelete'+id);
}

