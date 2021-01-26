let textInput =document.querySelector("#send-chat") ;
let send= document.querySelector(".send") ;
let chatList=document.querySelector(".chat-list")

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
    }

})

textInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter')  //or use key code (13 == e.keyCode)
    {          
        send.click() ;
    }
});