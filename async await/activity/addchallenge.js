const puppeteer = require("puppeteer");
const challenges = require("./challenges.js");
const id = "wimabag966@sofiarae.com";
const pwd  = "12345678";

( async function(){
   
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
          });

          let pages = await browser.pages() ;
          let tab= pages[0] ;
          await tab.goto("https://www.hackerrank.com/auth/login");
          await tab.type("#input-1" , id) ;
          await tab.type("#input-2", pwd) ;
          await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}) , tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled") ]); // navigation
        // load => when client gets the data
        // domcontentloaded => when data in loaded on the dom on the client side
        // networkidle0 => first 500ms jaha pe client se at max 0 request
        // networkidle2 => first 500ms jaha pe apke client se at max 2 request 
           
           await tab.click('div[data-analytics="NavBarProfileDropDown"]') ;
           await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration" ]' , {visible:true}) ;
           await tab.click('a[data-analytics="NavBarProfileDropDownAdministration" ]') ;
           await tab.waitForNavigation(".nav-tabs.nav.admin-tabbed-nav li") ;
           let bothLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
           let manageChallengeLi = bothLis[1];
        
           await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}) , manageChallengeLi.click() ]); // navigation
           let addChallengeBtn=  await  tab.$('.btn.btn-green.backbone.pull-right')  ;
           //reached challenge add page 
        
           let addChallengeLink = await tab.evaluate( function(element){   return element.getAttribute("href");  }  , addChallengeBtn);
           addChallengeLink = `https://www.hackerrank.com${addChallengeLink}` ;

           //loop  to add all challenges 
           for(let i=0 ;i<challenges.length; i++)
           {
               let newTab = await browser.newPage() ;
               addChallenge(newTab, challenges[i], addChallengeLink,i) ;
           }
    }

    catch(error){
        console.log(error);
    }
}) () ;
     

async function addChallenge(newTab, challenge, link ,i)
{
    try{
        let challengeName = challenge["Challenge Name"];
        let description = challenge["Description"];
        let problemStatement = challenge["Problem Statement"];
        let inputFormat = challenge["Input Format"];
        let constraints = challenge["Constraints"];
        let outputFormat = challenge["Output Format"];
        let tags = challenge["Tags"];

        await newTab.goto(link);
        await newTab.waitForSelector('#name' , {timeout: 10000, visible:true});
        await newTab.type("#name" , challengeName);
        await newTab.type("#preview" , description);
        await newTab.waitForSelector('#problem_statement-container .CodeMirror textarea'  , {timeout: 10000,visible:true});
        await newTab.type('#problem_statement-container .CodeMirror textarea' , problemStatement);
        await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
        await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
        await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
        await newTab.type('#tags_tag' , tags);
        await newTab.keyboard.press("Enter");
        await newTab.click(".save-challenge.btn.btn-green") ;
        console.log("challenge " +i +" added !") ;
        await newTab.close();;
    }
    catch(error){
        console.log(error);
    }
}