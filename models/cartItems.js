var mongoose = require('mongoose');


const cartSchema = new mongoose.Schema(
    {
        
        customer_id: {
            type: String,
            required:true
        },
        product_id_list: {
            type: Object
        }
        
    }
)


const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;