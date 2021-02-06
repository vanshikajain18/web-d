
let onlineList = document.querySelector(".list-online");
let id= 0 ;

socket.on("add-chat",function({message,name}){

    let chat= document.createElement("div");
    chat.classList.add("chat") ;
    chat.classList.add("left") ;
    chat.innerHTML= `${name} : ${message}`;
    chatList.append(chat) ;
    textInput.value="" ;
    chatList.scrollTop = chatList.scrollHeight ;

})

socket.on("join-chat",function(userObject){

    onlineDB.push(userObject);
    let chat= document.createElement("div");
    chat.classList.add("chat") ;
    chat.classList.add("join") ;
    chat.innerHTML= `${userObject.username} joined the chat`;
    chatList.append(chat) ;
    chatList.scrollTop = chatList.scrollHeight ;

    createLi(userObject) ;

})

socket.on("left-chat",function(name){

    removeFromOnlineList(name) ;
  
    let chat= document.createElement("div");
    chat.classList.add("chat") ;
    chat.classList.add("leave") ;
    chat.innerHTML= `${name} left the chat`;
    chatList.append(chat) ;
    chatList.scrollTop = chatList.scrollHeight ;

})

function removeFromOnlineList(name) 
{
    //loop on onlineDB to get the divID 
    //get element by divId 
    //remove element 
    //update onlineDB

    for(let i=0 ;i<onlineDB.length ;i++)
    {
        if(onlineDB[i].username == name)
        {
            let divId = onlineDB[i].divId ;
            let user= document.querySelector(`div[divId= "${divId}"]`) ;
            console.log(user) ;
            user.remove() ;

            let newDB = onlineDB.filter(function(userObject){
                return userObject.username != name ;
            })

            onlineDB= newDB ;
            return ;
        }
    }
    
    
}

function createOnlineList()
{
    // <div class="online">
    //  <div class="name">abc</div>
    //  <div class="green-dot"></div>
    //  </div>
    
    for(let i=0 ;i<onlineDB.length;i++)
    {
        createLi(onlineDB[i]) ;
    }

}

function createLi(userObject)
{
    let username= userObject.username ;   
    let li= document.createElement("div") ;
    li.classList.add("online") ;
    li.setAttribute("divId",id) ;
    console.log(li) ;
    userObject.divId = id ;
    id++ ;
    let name= document.createElement("div") ;
    name.classList.add("name");
    name.innerHTML = username ;
    let dot= document.createElement("div") ;
    dot.classList.add("green-dot");

    li.append(name);
    li.append(dot);
    onlineList.append(li) ;

}