const express = require("express") ;
const { userRouter } = require("./router/userRouter");
const app = express() ;

//to add data in req.body
app.use(express.json()) ;

// for all the user related functions navigate to userRouter;
app.use("/api/user", userRouter) ;

app.listen(3000, function(){
    console.log("app started at port 3000 !!") ;
})