
socket.on("add-chat",function({message,name}){

    let chat= document.createElement("div");
    chat.classList.add("chat") ;
    chat.classList.add("left") ;
    chat.innerHTML= `${name} : ${message}`;
    chatList.append(chat) ;
    textInput.value="" ;
    chatList.scrollTop = chatList.scrollHeight ;

})

socket.on("join-chat",function(name){

    let chat= document.createElement("div");
    chat.classList.add("chat") ;
    chat.classList.add("join") ;
    chat.innerHTML= `${name} joined the chat`;
    chatList.append(chat) ;
    chatList.scrollTop = chatList.scrollHeight ;

})

socket.on("left-chat",function(name){

    let chat= document.createElement("div");
    chat.classList.add("chat") ;
    chat.classList.add("leave") ;
    chat.innerHTML= `${name} left the chat`;
    chatList.append(chat) ;
    chatList.scrollTop = chatList.scrollHeight ;

})