var mongoose = require('mongoose');
const { truncate } = require('fs');

const orderSchema = new mongoose.Schema(
    {
        
        customer_id: {
            type: String,  
        },
        order_date: {
            type:Date,
            default: Date.now
        },
        payment_method: {
            type: String,
        },
        total_amt: {
            type:Number,   
        },
        order_status: {
            type:String,
            default: "Pending"
        },
        product_list:{
            type:Object
        },
        delivary_address: {
            type:String,
        },
        shipping_status : {
            type:String,
            default: "shipped"
        },
        shipping_status_time : {
            type: String,
            default: "17:45"
        }
        
    }
)

const Order = mongoose.model('order', orderSchema);

module.exports = Order;