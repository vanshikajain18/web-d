// async keyword => async keyword can be used with functions
// await keyword => await keyword can only be used inside async function

const fs = require("fs");

// node api/ web api => async tasks

// IIFE => Immediately Invoked Function Expressions  
// (function fun()
//  {
// console.log("start");
//  }) () ;

//AWAIT returns the data instead of promise 
//no need of then catch 

async function sayHi(){
    try{
        let f1kadata = await fs.promises.readFile("../promises/f1.txt") ;
        let  f2kadata = await fs.promises.readFile("../promises/f2.txt") ;

        console.log(f1kadata +"") ;
        console.log(f2kadata + "") ;
    }
    catch(error){
        console.log(error);
    }
};
sayHi();
console.log("end");

