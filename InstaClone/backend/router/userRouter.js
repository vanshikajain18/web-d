const { createUser } = require("../controller/userController");

const userRouter= require("express").Router() ;

//"localhost:3000/api/user"
userRouter.route("").post(createUser) ;

module.exports.userRouter = userRouter ;