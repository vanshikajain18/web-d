const request= require("request") ;
const cheerio = require("cheerio") ;
const fs = require("fs") ;
const { create } = require("domain");
const { createInflate } = require("zlib");
module.exports= getmatch ;

function getmatch(link)
{
    request(link,cb );
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
    let bothinnings= ch(".card.content-block.match-scorecard-table .Collapsible") ;
     
    for(let i=0; i<bothinnings.length; i++)
    {   
        teamName = ch(bothinnings[i]).find("h5").text();
        teamName= teamName.split("INNINGS")[0].trim() ;
        console.log(teamName) ;

        let allTr = ch(bothinnings[i]).find(" .table.batsman tbody tr") ;
        // record of each batsamn of that match 

        for(let j=0; j<allTr.length-1 ;j++)
        { 
             let allTd= ch(allTr[j]).find("td") ;
             //  {  <td> </td ,  <td> </td , <td> </td , <td> </td }

        if(allTd.length >1 )
        {
            let batsmanName = ch(allTd[0]).find("a").text().trim() ;
            let runs= ch(allTd[2]).text().trim();
            let balls= ch(allTd[3]).text().trim();
            let fours= ch(allTd[5]).text().trim();
            let sixes= ch(allTd[6]).text().trim() ;
            let strikeRate= ch(allTd[7]).text().trim() ;

            processDetails(batsmanName,teamName,runs,balls,strikeRate,fours,sixes) ;
        }
        }
    }

}

function processDetails(batsmanName,teamName,runs,balls,strikeRate,fours,sixes) 
{
   if(teamFolderExists(teamName))
   {
       if(batsmanExists(batsmanName))
           update(batsmanName,teamName,runs,balls,strikeRate,fours,sixes) ;

       else createFile(batsmanName,teamName,runs,balls,strikeRate,fours,sixes) ;
   }

   else createTeamFolder(teamName) ;
}

function createTeamFolder(teamName)
{
    let folderpath = `./IPL/${teamName}` ;
      fs.mkdirSync(folderpath);
}

function createFile(batsmanName,teamName,runs,balls,strikeRate,fours,sixes)
  {  let filepath = `./IPL/${teamName}/${batsmanName}.json` ;

      let batsmanFile =[] ;
      let innings={
        "Runs" : runs , 
        "Balls" : balls ,
        "Fours":fours,
        "Sixes":sixes,
        "SR" : strikeRate
      }

      batsmanFile.push(innings) ; //pushing an object into the array 
      fs.writeFileSync(filepath, JSON.stringify(batsmanFile)) ;

}

function teamFolderExists(teamName)
{
    let folderpath = `./IPL/${teamName}` ;
    return fs.existsSync(folderpath);
}

function batsmanExists(batsmanName)
{
    let filepath = `./IPL/${teamName}/${batsmanName}.json` ;
    return fs.existsSync(filepath);
}

function update(batsmanName,teamName,runs,balls,strikeRate,fours,sixes) 
{  
    let filepath = `./IPL/${teamName}/${batsmanName}.json`
    let batsmanFile = fs.readFileSync(filepath) ;
    batsmanFile= JSON.parse(batsmanFile) ;
    let innings={
      "Runs" : runs , 
      "Balls" : balls ,
      "Fours":fours,
      "Sixes":sixes,
      "SR" : strikeRate
    }

    batsmanFile.push(innings) ;
    fs.writeFileSync(filepath, JSON.stringify(batsmanFile)) ;

}
