const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require("../controller/userController");

const userRouter= require("express").Router() ;

//"localhost:3000/api/user"
userRouter.route("").post(createUser).get(getAllUser) ;

userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser) ;
//patch method is for update and delete for delete 

module.exports.userRouter = userRouter ;