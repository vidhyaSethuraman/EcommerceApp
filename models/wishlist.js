var mongoose = require('mongoose');


const wishlistSchema = new mongoose.Schema(
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


const Wishlist = mongoose.model('wishlist', wishlistSchema);

module.exports = Wishlist;