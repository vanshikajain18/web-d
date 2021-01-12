const request= require("request") ;
const cheerio= require("cheerio") ;
const getmatch = require("./match");


function getallmatches(link)
{
    request(link,cb) ;
}

function cb(error,response,data)
{
    if(error==null)
    parseData(data) ;

    else console.log(error) ;
}

function parseData(data)
{
    let ch= cheerio.load(data) ;
    let allAtags=ch('a[data-hover="Scorecard"]') ;
    //console.log(allAtags) ;
    for(let i=0; i<allAtags.length ; i++)
    {
        let link=ch(allAtags[i]).attr("href") ;
        let completeLink= `https://www.espncricinfo.com${link}` ;
        //console.log(completeLink) ;
         getmatch(completeLink);
        // console.log(allAtags.length) ;


    }
}

module.exports= getallmatches ;