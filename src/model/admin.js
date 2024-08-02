const mongoose = require('mongoose');
const addSchema = mongoose.Schema({
    username:{
        type:String,
    },
    password1:{
        type:String
    },
    gend:{
        type:String,
    },
    adhar:{
        type:Number,
    },
    mobile:{
        type:Number,
    },
    Trustedp:{
        type:Number,
    },
    Mail:{
        type:String,
    },
    Village:{
        type:String
    },
    Pincode:{
        type:Number,
    }
})
const mailSchema = mongoose.Schema({
    gmail:{
        type:String
    }
})
const Admin = mongoose.model('disaster',addSchema);
const email = mongoose.model('email',mailSchema);
module.exports = {Admin,email};