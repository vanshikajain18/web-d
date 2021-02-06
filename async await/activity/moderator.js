const puppeteer=require("puppeteer");
const id="wimabag966@sofiarae.com";

const pwd="12345678" ;
let tab ;

(async function(){
    try{
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
          });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto('https://www.hackerrank.com/auth/login');
        await tab.type("#input-1" , id);
        await tab.type( "#input-2" , pwd );
        await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}) , tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled") ]); // navigation
       
        await tab.click('div[data-analytics="NavBarProfileDropDown"]');
        await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
        await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}) , tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]') ]); // navigation
        // let bothLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
        // let manageChallengeLi = bothLis[1];

    }

    catch(error)
    {console.log(error);}
}) () ; 