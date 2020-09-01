var mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
    {
        
        customer_id: {
            type: String,
            required:true
        },
        card_holder_name: {
            type:String,
            required:true
        },
        card_number: {
            type:String,
            required:true
        },
        bank_name: {
            type:String,
            required:true
        },
        card_expiry_month: {
            type:String,
            required:true
        },
        card_expiry_year:{
            type:String,
            required:true
        },
        card_number_last: 
        {
            type:String
        }

    }
)

cardSchema.pre('save', async function(next){

    let cardno = this.card_number;
    //console.log(typeof(cardno));
    cardno = cardno.substring(cardno.length-4);
    this.card_number_last= cardno;
    next();
})

const Card = mongoose.model('card', cardSchema);

module.exports = Card;