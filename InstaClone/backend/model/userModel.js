const { mongoose } = require("./db");

//make schema or format of document
let userSchema = mongoose.Schema({
    name: {
        type: String ,
        required : true 
    },
    username : {
        type: String ,
        required : true ,
        unique : true 
    },
    bio: {
        type: String ,
        required : true 
    },
    email : {
        type: String ,
        required : true,
        unique : true 
    },
    password : {
        type: String ,
        required : true 
    },
    isPublic: {
        type: Boolean ,
        default : true  
    },
    profilePic : {
        type: String ,
        default : "default.png" 
    }

})

//create userModel 
const userModel= mongoose.model('user', userSchema) ;
module.exports = userModel ;