const { mongoose } = require("./db");

let postSchema = mongoose.Schema({
    postImage :{
        type:String,
        required: true 
    },
    postCaption :{
        type: String 
    },
    createdOn :{
        type: Date,
        default:Date.now 
    },
    uid :{
      type:String ,
      required: true 
    }

})

const postsCollection = mongoose.model('post',postSchema) ;
module.exports = postsCollection