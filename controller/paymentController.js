const Card = require('../models/card');
const Order= require('../models/orders');
const { userInfo } = require('os');

module.exports.payment_post = async (req,res) => {

    var userinfo = res.locals.user;
    var {selectedaddr} =req.body;
    //console.log("address " + selectedaddr);
    var cardno =null;
    try
    {
        var usercard = await Card.find({customer_id : userinfo._id});
        console.log(usercard);
        const orderdetails = await Order.findOneAndUpdate({customer_id : userinfo._id},{delivary_address:selectedaddr});
    }
    catch(err)
    {
        console.log("Issue occured while searching for customer card"+err);
    }

    res.render('paymentform',{usercard});
}

module.exports.payment_gateway = async (req,res) => {
    console.log("payment gateway");
    var userinfo = res.locals.user;
    var {payment_method,bank_name,card_holder_name,card_number,card_expiry_month,card_expiry_year,savecard} =req.body;

    try
    {
         if(savecard=="on")
         {

            console.log("user wants to save card")
            const usercard = await Card.create({
                customer_id : userinfo._id,
                card_holder_name,
                card_number,
                bank_name,
                card_expiry_month,
                card_expiry_year
            });

            console.log(usercard);
         }   
         console.log(payment_method);

         const orderdetails = await Order.findOneAndUpdate({customer_id : userinfo._id},{payment_method});
    }
    catch(err)
    {
        console.log(err);
    }

    res.redirect('/order/placed');

}