let textInput =document.querySelector("#send-chat") ;
let send= document.querySelector(".send") ;
let chatList=document.querySelector(".chat-list") ;

let onlineDB=[] ;

let username = prompt("Enter Your Name");        //to get username 
console.log(username);

socket.emit("join" , username);

socket.on("create-list", function(usernameDb){
    onlineDB = usernameDb ;
 createOnlineList() ;
})

send.addEventListener("click",function(){
    let message= textInput.value ;
    // console.log(message) ;
    if(message)
    {
        let chat= document.createElement("div");
        chat.classList.add("chat") ;
        chat.classList.add("right") ;
        chat.innerHTML= message;
        chatList.append(chat) ;
        textInput.value="" ;
        chatList.scrollTop = chatList.scrollHeight ;

        socket.emit("send-chat",message) ;
        
    }

})

textInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter')  //or use key code (13 == e.keyCode)
    {          
        send.click() ;
    }
});