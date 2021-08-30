const mongoose = require("mongoose");
//const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    id:{type:String, required:true, unique:true},
    email:String,
    password:String,
}) ;
//UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);