const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
    required:[true,"Enter username"],
},
email:{
    type:String,
    required:[true,"Enter an email id"],
    unique:[true,"Email address already exists"]
},
    password:{
        type:String,
    required:[true,"Enter a password"]
}},
{timestamps:true});

module.exports=mongoose.model("Users",userSchema);
