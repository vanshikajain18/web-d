//a promise is attached to then 
// so, then also returns a pending promise 
// the data from previous promise is catched in the next then 


const fs=require("fs") ;

let f1promise= fs.promises.readFile("./f1.txt") ;

f1promise.then(function(data)    // data = f1 ka data 
{ console.log(data+" ");
let f2promise= fs.promises.readFile("./f2.txt");
return f2promise ;
}) 
.then(function(data)        // data= f2 ka data
{
    console.log(data+" ") ;
    let f3promise = fs.promises.readFile("./f3.txt") ;
    return f3promise ;
})
.then(function(data)       // data= f3 ka data
{
    console.log(data+" ") ;} )
.catch(function(error)
{console.log(error);}
) ;