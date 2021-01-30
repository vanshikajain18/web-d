//for backend 

const express = require("express") ;
const { connected } = require("process");
const app= express() ;
const http = require('http').Server(app);
const io = require('socket.io')(http);
let usernameDb = [] ;

app.use(express.static("public")) ;

io.on('connection', function(socket){
    console.log(socket.id + " connected !! ");
    usernameDb.push({id:socket.id }) ;

    socket.on("join",function(name){
      
      for(let i=0;i<usernameDb.length ;i++)
      {
        if(usernameDb[i].id == socket.id )
        {
          usernameDb[i].username = name ;
          break ;
        }
      }
      console.log(usernameDb) ;

    socket.broadcast.emit("join-chat" , name) ;
      
    })

  socket.on("send-chat",function(message){
    let name ;
    for(let i=0 ;i<usernameDb.length ;i++)
    {
      if(usernameDb[i].id == socket.id){
        name = usernameDb[i].username;
        break ;
      }
    }
    socket.broadcast.emit("add-chat",{message, name} ) ;
  })

  socket.on("disconnect",function(){

    let newDB = usernameDb.filter(function(socketObject){
      if(socketObject.id == socket.id){
        username = socketObject.username;
        return false;
      }
      else return true;
    })

    usernameDb = newDB ;
    socket.broadcast.emit("left-chat" , username) ;
    console.log(usernameDb) ;
}) 

})

http.listen(3000, function(){
  console.log('listening on *:3000');
}) 

