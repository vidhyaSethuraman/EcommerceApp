var mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {

        customer_id:
        {
            type:String,
            required:true
        },
        name: {
            type:String
        },
        mobileno: {
            type: String
        },
        pincode: {
            type: Number,
            minlength: 6,
            required: true
        },
        details: {
            type:String,
            required:true
        },
        landmark: {
            type:String
        },
        city: {
            type: String,
            required:true
        },
        state: {
            type:String,
            required:true
        },
        defaulta: {
            type: Boolean
        },
        home_address: {
            type:Boolean
        },
        office_address: {
            type:Boolean
        }
        
    }
)

const Address = mongoose.model('address', addressSchema);

module.exports = Address;
