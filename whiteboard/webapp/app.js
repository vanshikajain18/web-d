//for backend 

const express = require("express") ;
const app= express() ;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static("public")) ;

io.on('connection', function(socket){
    console.log(socket.id + " connected !! ");
})

http.listen(3000, function(){
  console.log('listening on *:3000');
}) 

// socket.on("md",function(pointObject){
// console.log(pointObject) ;
// })

// socket.on("mm",function(pointObject){
    
// })

// socket.on("mu",function(pointObject){
    
// })