// request is a module which allows us to make http calls
//cheerio is used to work on html elements 

const request= require("request") ;
const cheerio= require("cheerio") ;
const getallmatches = require("./allmatches");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb) ;  //gets the html of the link via cb 

function cb(error,response,data)
{
    if(error==null)
    parseData(data) ;

    else console.log(error) ;
}


function parseData(data)        //data= html of the link
{
    const ch= cheerio.load(data) ;
    let link= ch(".widget-items.cta-link a").attr("href") ;
     let completeLink= `https://www.espncricinfo.com${link}` ;
    
     getallmatches(completeLink) ;
}