const userModel = require("../model/userModel");

async function createUser(req,res){
    try{
        let userObject = req.body ;
        console.log(userObject)
        let userCreated= await userModel.create(userObject);  //create object(document) in mondoDB 
         res.json({
             message: "user created successfully!",
             userObject
         })
    }
    catch(error){
        res.json({
            message:" error in creating user!",
            error
        })
    }
}

async function getAllUser(req,res){
try{
    let allUsers = await userModel.find() ; //to find all docs in user collection
    // console.log(allUsers);
    res.json({
        message:"successfully got all users!",
        allUsers
    })
}
catch(error){
    res.body({
        message:"get method failed!"
    })
}
}

async function getUserById(req,res){
  try{
    let id = req.params.id  ;
    let user= await userModel.findById(id);
    res.json({
        message:"successfully got user!",
        user 
    })
}
catch(error){
    res.body({
        message:"get method failed!"
    })
}
    
}

async function updateUser(req,res){
    try{
        let updatedObject = req.body ;
        let id= req.params.id ;
    let user= await userModel.findById(id);
        
    for(let key in updatedObject)
    { user[key] = updatedObject[key] }      //loop to update the user object locally 

    let updatedUser = await user.save() ; //to change in mondoDB 

    res.json({
        message:"successfully updated user!",
        updatedUser 
    })
}
catch(error){
    res.body({
        message:"user update failed!"
    })
}
}

async function deleteUser(req,res){
   try{
        let id= req.params.id ;
    let deletedUser= await userModel.findByIdAndDelete(id);
    console.log(deletedUser);
    res.json({
        message:"successfully deleted user!",
        deletedUser 
    })
}
catch(error){
    res.body({
        message:"user deletion failed!"
    })
}
}

module.exports.createUser = createUser ;
module.exports.getAllUser= getAllUser ;
module.exports.getUserById= getUserById ;
module.exports.deleteUser=deleteUser ;
module.exports.updateUser= updateUser ;