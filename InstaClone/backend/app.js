const express = require("express") ;
const postsRouter = require("./router/postRouter");
const requestRouter = require("./router/requestRouter");
const { userRouter } = require("./router/userRouter");
const app = express() ;

//to add data in req.body
app.use(express.json()) ;

// for all the user related functions navigate to userRouter;
app.use("/api/user", userRouter) ;

app.use("/api/request", requestRouter) ;

app.use("/api/post" , postsRouter) ;

app.listen(3000, function(){
    console.log("app started at port 3000 !!") ;
})