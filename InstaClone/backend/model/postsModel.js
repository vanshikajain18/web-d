const { mongoose } = require("./db");

let postSchema = mongoose.Schema({
    postImage :{
        type:String,
        required: true 
    },
    caption :{
        type: String 
    },
    createdOn :{
        type: Date,
        default:Date.now
    },
    uid :{
      type:String ,
      required: true 
    },
    likes: [{uid:String}],
    comments: [ {uid:String , comment:String }]

})

const postsCollection = mongoose.model('post',postSchema) ;
module.exports = postsCollection