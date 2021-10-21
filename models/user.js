const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name : {
        type : String,
    },
    phoneno :{
        type : String,
    },
    email :{
        type : String,
    },
    customerid :{
        type : String,
    },
    token :{
        type : Number,
    },
    variant :{
        type : String
    }
})

const user = mongoose.model("user" , UserSchema);
module.exports = user;