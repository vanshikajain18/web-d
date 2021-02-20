const followerModel = require("../model/followerModel");
const followingModel = require("../model/followingModel");
const userModel = require("../model/userModel");

async function sendRequest(req,res){
    try{
        let {uid, followId}= req.body ;
        //check if followId is public or private 
        let object = await userModel.find({_id :followId}).exec();
        // console.log(object) ;
        if(object[0].isPublic)
        { //public 
           await followingModel.create({
               uid,
               followId
           })

           await followerModel.create({
               uid : followId ,
               followerId : uid 
           })
           res.json({
               message : "Request sent and accepted!!"
           })
        }
        else{ //private 
            await followingModel.create({
                uid,
                followId,
                isAccepted : false 
            })
            res.json({
                message : "Request sent and pending!!"
            })
        }

    }
    catch(error){
        res.json({
        message:"Send request failed !!",
        error
        })
    }
}

async function acceptRequest(req,res){
 try{
     let {uid, toBeAccepted} = req.body ;

     let doc= await followingModel.find({uid:toBeAccepted , followId: uid}).exec() ;

     if(doc[0]) {
         doc[0].isAccepted = true ;
         await doc[0].save() ;
     
     await followerModel.create({
         uid,
         followerId: toBeAccepted 
     })
     
    res.json({
        message : "Request accepted !!"
    })
}
 }
 catch(error){
    res.json({
        message:"Accept request failed !!",
        error
        })
 }
}

async function deleteRequest(req,res){
try{
    let {uid, toBeAccepted} = req.body ;
    await followingModel.deleteOne({uid:toBeAccepted , followId:uid , isAccepted:false}) ;

    res.json({
        message : "Request deleted !!",
    })

}
catch(error){
    res.json({
        message:"Delete request failed !!",
        error
        })
}
}

async function pendingRequest(req,res){
try{
   let uid = req.params.id ;
   
   let docs = await followingModel.find({followId:uid , isAccepted:false}) ;
   let requests =[] ;

   for(let i=0 ;i<docs.length ; i++)
   {
       let id = docs[i].uid ;
       let doc= await userModel.findById(id) ;
       requests.push(doc) ;
   }

   res.json({
       message:"Got all pending requests !!",
       count: requests.length ,
       requests
   })
}
catch(error){
    res.json({
        message: "Get pending request failed !!",
        error
    })
}

}

async function cancelRequest(req , res){
    try{
        let {uid, followId} = req.body ;
        await followingModel.deleteOne({uid: uid , followId: followId, isAccepted:false}) ;
    
        res.json({
            message : "Request canceled !!",
        })
      }
    catch(error){
        res.json({
            message:"Cancel request failed !!",
            error
            })
    }
}

async function removeFollowing(req , res){
    try{
        let uid= req.params.id ;
        let {toBeRemoved} = req.body ;
        //find the doc in following model with uid=uid and followid= toBeRemoved 
        
        let doc =await followingModel.deleteOne({uid:uid , followId: toBeRemoved, isAccepted:true}) ;

        await followerModel.deleteOne({uid:toBeRemoved , followerId:uid}) ; //remove from follower collection

        if(doc.deletedCount=="1")  res.json({  message:"Following removed!!" }) 
        else if (doc.deletedCount=="0")  res.json({  message:"Could not find the user to be removed!!" }) 
    }
catch(error){
    res.json({
        message:"Could not remove following" ,
        error
    })
}

}

async function removeFollower(req , res){
    try{
        let uid= req.params.id ;
        let {toBeRemoved} = req.body ;
        //find the doc in following model with uid=uid and followid= toBeRemoved 
        
        let doc =await followerModel.deleteOne({uid:uid , followerId: toBeRemoved }) ;
        await followingModel.deleteOne({uid:toBeRemoved , followId:uid}) ; //remove from following collection

        if(doc.deletedCount=="1")  res.json({  message:"Follower removed successfully!!" }) 
        else if (doc.deletedCount=="0")  res.json({  message:"Could not find the user to be removed!!" }) 
    }
catch(error){
    res.json({
        message:"Could not remove follower" ,
        error
    })
}
}

async function returnFollowing(uid){
    let docs= await followingModel.find({uid:uid , isAccepted:true})
     let followings=[] ;
     
     for(let i=0 ;i<docs.length ;i++)
     {
         let id = docs[i].followId ;
         let followingDoc = await userModel.findById(id) ;
         followings.push(followingDoc) ;
     }
     return followings ;
}

async function getAllFollowing(req , res){
    
try{
     let uid= req.params.id ;
     let followings = await returnFollowing(uid) ;
     
     if(followings==[]){
        res.json({
            message: "You don't have any followings!!" , 
        })
    }
     res.json({
         message: "Got all following successfully" ,
         count : followings.length,
         followings        
     })
 }

 catch(error){
     res.json({
         message:"Could not get following !!",
         error
     })
 }

}

async function getAllFollowers(req , res){
    
    try{
        let uid= req.params.id ;
        let docs= await followerModel.find({uid:uid })
        let followers=[] ;
        
        for(let i=0 ;i<docs.length ;i++)
        {
            let id = docs[i].followerId ;
            let followerDoc = await userModel.findById(id) ;
            followers.push(followerDoc) ;
        }
        if(followers==[]){
            res.json({
                message: "You don't have any follower!!" , 
            })
        }
        res.json({
            message: "Got all followers successfully" ,
            count : followers.length,
            followers        
        })
    }
   
    catch(error){
        res.json({
            message:"Could not get followers !!",
            error
        })
    }
}

async function getSuggestions(req , res){
try{
    let uid= req.params.id ;
    let myFollowing = await returnFollowing(uid) ;      //we get user docs here
    let checklist = myFollowing.map(function(user){
        return user["_id"]+"" ;
    })

    if(myFollowing.length)
    {
        let suggestions=[] ;
        for(let i=0;i<myFollowing.length; i++)
        {
            let followingOfMyFollowings = await returnFollowing(myFollowing[i][_id]) ;
            for(let j=0 ; j<followingOfMyFollowings.length ; j++){
                if(!checklist.includes(followingOfMyFollowings[j]["_id"])){
                    suggestions.push(followingOfMyFollowings[j]);
                    checklist.push(followingOfMyFollowings[j]["_id"]+"");
                }
            }
        }
        res.json({
            message:"Got all suggestions!",
            suggestions
        })
    }
    else{
        res.json({
            message:"No suggestions!"
        })
    }

}
catch(error){
    res.json({
        message:"Could not get suggestions!!",
        error
    })
}
}

module.exports.sendRequest = sendRequest;
module.exports.acceptRequest = acceptRequest ;
module.exports.deleteRequest = deleteRequest ;
module.exports.pendingRequest = pendingRequest ;
module.exports.cancelRequest = cancelRequest;
module.exports.removeFollowing = removeFollowing;
module.exports.removeFollower = removeFollower;
module.exports.getAllFollowing = getAllFollowing;
module.exports.getAllFollowers = getAllFollowers;
module.exports.getSuggestions = getSuggestions;