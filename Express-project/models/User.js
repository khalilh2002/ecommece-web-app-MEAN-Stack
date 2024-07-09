const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default : false
    },
    password:{
        type:String,
        required:true
    },
    verificationToken:{
        type:String,
        required:false
    },
    verificationTokenExpireDate:{
        type:Number,
        required:false
    },
    createdAt:{
        type: Date,
        default : Date.now
    }
})
const User = mongoose.model('User', userSchema);

module.exports = User;
