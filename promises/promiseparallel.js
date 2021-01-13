//async work 
//all run parallelly 
//random output

const fs=require("fs") ;

let f1promise= fs.promises.readFile("./f1.txt") ;

f1promise.then(function(data)
{ console.log(data+" ");
}) ;

f1promise.catch(function(error){
    console.log(error) ;
});

let f2promise= fs.promises.readFile("./f2.txt") ;

f2promise.then(function(data)
{ console.log(data+" ");
}) ;

f2promise.catch(function(error){
    console.log(error) ;
});

let f3promise= fs.promises.readFile("./f3.txt") ;

f3promise.then(function(data)
{ console.log(data+" ");
}) ;

f3promise.catch(function(error){
    console.log(error) ;
});