const mongoose = require('mongoose');

//Schema
const usersSchema = new mongoose.Schema({
    first_name : { type : String, required : true, },
    last_name : { type : String,},
    email : { type : String, required : true, unique : true, },
    gender: { type : String,},
    job_title : { type : String, required : true, },
}, {timestamps : true});

//Creating model
const User = mongoose.model("user", usersSchema);

module.exports = User;