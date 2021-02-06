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
           await Promise.all([tab.waitForNavigation({waitUntil: "networkidle2"})  , tab.click('.btn.btn-green.backbone.pull-right') ]) ;
           //reached challenge add page 
           await tab.type("#name", );
           await tab.type("#preview ", );
           await tab.type(".CodeMirror-line __web-inspector-hide-shortcut__", );
           await tab.type(" ", );
           await tab.type(" ", );









    }

    catch(error){
        console.log(error);
    }
}) () ;
     