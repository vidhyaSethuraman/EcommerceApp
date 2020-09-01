const Card = require('../models/card');
const Order= require('../models/orders');
const Cart = require('../models/cartItems');
const Product = require('../models/products');

module.exports.order_placed_get = async (req,res) => {
    
    var userinfo = res.locals.user;
    try
    {
        Cart.findOneAndRemove({ customer_id : userinfo._id }, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Removed cart : ", docs); 
            } 
        }); 

        const orderdetails = await Order.findOneAndUpdate({customer_id : userinfo._id},{order_status: "Placed"});
    }
    catch(err)
    {
        console.log("ORder page error " +err);
    }

   
    var delivary_date = new Date(new Date().getTime()+(5*24*60*60*1000));
    delivary_date = delivary_date.toString();
    delivary_date = delivary_date.slice(0,15); 
   

    res.render('orderplaced',{delivary_date});
}

/*module.exports.order_get = async (req,res) => {

    var userinfo = res.locals.user;
    try{
        let userorder = await Order.findOne({customer_id : userinfo._id});
        console.log(userorder);
    }
    catch(err)
    {
        console.log("Order page " + err);
    }
    res.send("Order are displayed here");
}*/

module.exports.order_track_get = async (req,res) => {

    var userinfo = res.locals.user;
    try
    {
        var orderdetails = await Order.findOne({customer_id: userinfo._id}).sort({order_date: 'desc'});
        console.log(orderdetails);
        console.log("indu products");
        var prod_list =orderdetails.product_list;
        

        var orderProductDetails =[];
      
     
        for (let item of Object.keys(prod_list))
        {
            let productDetails =await Product.findOne({id:item});
            orderProductDetails.push(productDetails); 
        }

    }
    catch(err)
    {
        console.log("Error in track order page " + err);
    }

    var order_date = orderdetails.order_date;
    order_date = order_date.toString();
    order_date = order_date.slice(3,15); 
    
    res.render('ordertrackpage', {orderdetails,prodet :orderProductDetails,order_date});

}