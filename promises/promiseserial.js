//promise hell 
//nested promises

const fs=require("fs") ;
let f1promise= fs.promises.readFile("./f1.txt") ;

f1promise.then(function(data)
{ console.log(data+" ");
   
let f2promise= fs.promises.readFile("./f2.txt") ;

f2promise.then(function(data)
{ console.log(data+" ");
  
let f3promise= fs.promises.readFile("./f3.txt") ;

f3promise.then(function(data)
{ console.log(data+" ");
}) ;

f3promise.catch(function(error){
    console.log(error) ;
});
}) ;

f2promise.catch(function(error){
    console.log(error) ;
});

}) ;

f1promise.catch(function(error){
    console.log(error) ;
});