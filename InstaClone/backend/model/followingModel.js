const { mongoose } = require("./db");

let followingSchema = mongoose.Schema({

    uid :{
        type: String ,
        required : true 
    },
    followId :{
        type: String ,
        required : true 
    },
    isAccepted : {
        type: Boolean ,
        default : true 
    }
})

const followingModel = mongoose.model('following', followingSchema) ;
module.exports = followingModel ;