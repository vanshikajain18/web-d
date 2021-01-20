const puppeteer= require("puppeteer") ;
const id="" ;
const pwd ="" ;

(async function()
{
   try{
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });

      let pages = await browser.pages() ;
      let tab= pages[0] ;
      await tab.goto("https://www.instagram.com/");
      await tab.waitForSelector('input[name="username"]') ;
      await tab.type('input[name="username"]' , id) ;
      await tab.type('input[name="password"]' ,pwd) ;
      await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}), tab.click('.sqdOP.L3NKy.y3zKF ')]) ;  //login button
      await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}), tab.click('.sqdOP.yWX7d.y3zKF ')]) ;  //dialouge box
      
      await tab.click('.aOOlW.HoLwm  ') ;  //dialouge box
      await tab.type('.XTCLo.x3qfX' , "Pepcoding") ; //search box
      await tab.waitForSelector('.yCE8d ', {visible:true}) ;
      let allProfiles = await tab.$$('.yCE8d ') ;
      let pepcoding = allProfiles[0];
      await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}), pepcoding.click()]) ;  //pepcoding box
      await tab.waitForSelector('.v1Nh3.kIKUG._bz0w .eLAPa', {visible:true}) ;
      let firstPost = await tab.$('.v1Nh3.kIKUG._bz0w .eLAPa') ;
     await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle2"}), firstPost.click()]) ; 
     await tab.waitForSelector('svg[aria-label="Like"]', {visible:true}) ;
       await tab.click('svg[aria-label="Like"]') ; //like
       await tab.click('  ._65Bje.coreSpriteRightPaginationArrow') ;  //next 

   }

   catch{
       console.log("error") ;
   }
}) () ;