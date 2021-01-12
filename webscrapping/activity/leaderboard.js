const request= require("request") ;
const cheerio = require("cheerio") ;
const fs = require("fs") ;
module.exports= getmatchleaderboard ;
let count =1 ;

function getmatchleaderboard(link)
{   
    request(link,cb );
    count++ ;
}

function cb(error,response,data)
{
    if(error==null)
    {  count-- ;
        parseData(data) ;
        if(count==1) console.table(leaderboard) ;
    }   

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

           makeleaderboard(batsmanName,teamName,runs,balls,strikeRate,fours,sixes) ;
        }
        }
    }

}

let leaderboard=[];

function makeleaderboard(batsmanName,teamName,runs,balls,strikeRate,fours,sixes)
{
    runs= Number(runs);
    balls=Number(balls);
    strikeRate=Number(strikeRate);
    fours=Number(fours);
    sixes=Number(sixes);

    //loop on leaderboard
  for(let i=0; i<leaderboard.length ;i++)
    { 
        if(leaderboard[i]["Batsman"]== batsmanName )
        {   runs+= runs;
            balls+=balls ;
            strikeRate+=strikeRate ;
            fours+=fours ;
            sixes+= sixes ;
            return ;
        }
    }    

            let bMan=
            { 
             "Team Name" : teamName ,
             "Batsman" : batsmanName,
            "Runs" : runs , 
            "Balls" : balls ,
            "Fours":fours,
            "Sixes":sixes,
            "SR" : strikeRate 
            } 

            leaderboard.push(bMan);

}
