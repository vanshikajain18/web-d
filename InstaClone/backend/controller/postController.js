const followingModel = require("../model/followingModel");
const postsCollection = require("../model/postsModel");
const userModel = require("../model/userModel");

async function createPost(req,res)
{
  try{
      let postObject = req.body ;
      postObject.uid = req.params.id ;
      if(req.file)
      {
         let postImagePath = `images/posts/${req.file.filename}` ;
         postObject.postImage = postImagePath ;  
      }

      let postCreated = await postsCollection.create(postObject) ;
      res.json({
        message: "Post created successfully!",
        postCreated 
    })
  }
  catch(error){
    res.json({
        message:" error in creating post!",
        error
    })
}
}

async function updatePost(req,res)
{
    try{
        let pid = req.params.pid ;
        let updatedCaption= req.body.caption ;
    
        let post = await postsCollection.findById(pid) ;
        post.caption = updatedCaption ;
       
        let updatedPost = await post.save() ;
        res.json({
          message: "Post updated successfully!",
          updatedPost 
      })
    }
    catch(error){
      res.json({
          message:" error in updating post!",
          error
      })
  }
}

async function deletePost(req,res)
{
    try{
        let pid = req.params.pid ;
        let post = await postsCollection.findByIdAndDelete(pid) ;
     
        res.json({
          message: "Post deleted successfully!",
         post
      })
    }
    catch(error){
      res.json({
          message:" error in deleting post!",
          error
      })
  }
}

async function getFeedPosts(req,res)
{
    try{

        let uid= req.params.id ;
        let myfollowings = await followingModel.find({uid:uid , isAccepted:true}) ;
     
         let feedPosts = [] ;
     
        for(let i=0 ;i<myfollowings.length ; i++)
        {
            let post = await postsCollection.find({ uid: myfollowings[i].followId }) ; 
            feedPosts.push(post) ;
        }

        // feedPosts.sort(function(a,b){
        //     return new Date(b.createdOn) - new Date(a.createdOn); 
        // })
        
    res.json({
        message :"Got all Posts !!",  
        feedPosts
      })
    }
  catch(error){
    res.json({
        message:" Could not get posts !",
        error
    })
}
}

async function getMyPosts(req,res)
{
  try{
      let uid = req.params.id ;
      let myPosts = await postsCollection.find({uid:uid}) ;

      res.json({
        message :"Got all Posts !!",  
        myPosts
      })
  }
  catch(error){
    res.json({
        message:" Could not get posts !",
        error
    })
}
}

module.exports.createPost = createPost ;
module.exports.updatePost= updatePost ;
module.exports.deletePost = deletePost ;
module.exports.getFeedPosts = getFeedPosts ;
module.exports.getMyPosts = getMyPosts ;