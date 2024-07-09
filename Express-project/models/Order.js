const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items:[{
        name : String,
        price : Number,
        quantity : Number
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    createdAt:{
        type: Date,
        default : Date.now
    }
})

const Order  = mongoose.Model('Order' , OrderSchema)

module.exports = Order