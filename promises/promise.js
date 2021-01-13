const fs=require("fs") ;

let pendingpromises= fs.promises.readFile("./f1.txt") ;

console.log(pendingpromises) ;

// success callback is attached to then
pendingpromises.then(function(data)
{
    console.log(pendingpromises);
     console.log(data+" ") ;
}) ;

// failure callback is attached to catch 
pendingpromises.catch(function(error)
{
    console.log(error) ;
}) ;
