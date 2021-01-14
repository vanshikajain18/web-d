// use puppeteer module for automation
// pptr.dev for documentation
// automate code submission 

const puppeteer=require("puppeteer");
const id="wimabag966@sofiarae.com";
const pwd="12345678" ;
let tab ;
let idx ;
let globalCode ;

// launch browser
// all functions of puppeteer are promisified => pending promise

let browseropenpromise = puppeteer.launch({                        //this function will give a pending promise and returns a browser
    headless:false,
    defaultViewport: null,
    args: ["--start-maximized"]
});  

browseropenpromise.then(function(browser)
    { 
        let pagespromise= browser.pages() ;   //returns array of all pages opened in browser
        return pagespromise ;
    })
    .then(function(pages)
    {
        let page= pages[0] ;
        tab=page ;
        let gotopromise = page.goto("https://www.hackerrank.com/auth/login");  //goto is used to navigate to a certain page
        return gotopromise;                                                    // returns response 
    })
    .then(function()
    {  let idTypedPromise = tab.type("#input-1" , id);
    return idTypedPromise;
    })
    .then(function()
    {
        let pwdtypedpromise = tab.type("#input-2", pwd);
        return pwdtypedpromise;
    })
    .then(function()
    {
        let loginpromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");  
        return loginpromise;
    })
    .then(function()
    {
       // let waitfornavigationpromise = tab.waitForSelector('#base-card-1-link'); // max wait 30 sec
      let ipkitpromise= waitandclick('#base-card-1-link');
      return ipkitpromise;
    })
    .then(function()
    {  
        let warmuppromise= waitandclick('a[data-attr1="warmup"]')   ;  
        return warmuppromise;
    })
   .then(function()
   {  let waitpromise=tab.waitForSelector(".js-track-click.challenge-list-item");
    return waitpromise ;
   })
   .then(function(){
       //tab.$$() runs document.querySelectorAll within the page.
       let allATagsPromise = tab.$$(".js-track-click.challenge-list-item") ;  
       return allATagsPromise ; //returns a tags  //[ <a  /> , <a  /> , <a  />, <a  /> ];
   })
   .then(function(allATags)
   {
       let allLinkspromise= [];       // [promise<pending> , promise<pending> ]
       for(let i=0; i<allATags.length; i++)
       { let linkpromise= tab.evaluate(function(element){ return element.getAttribute("href");}, allATags[i]) ;
        //evaluate runs the parameter function on dom  
        //the second paramter is catched as the element for function
        allLinkspromise.push(linkpromise) ;
     }

     let pendingPromise = Promise.all(allLinkspromise);  //waits till data is received for all and converts it into data array
     return pendingPromise;
   })
   .then(function(allLinks){
        let completeLinks = allLinks.map(function(link){                //JUST RUNS A LOOP //link=allLinks[i]
          return `https://www.hackerrank.com${link}`; }) ;

          let onequesSolvePromise= solveques(completeLinks[0]);            //for first ques

          for(let i=1; i<completeLinks.length;i++)                     //promise chaining using loop 
        {   
            onequesSolvePromise= onequesSolvePromise.then(function()
            {
                let nextquespromise= solveques(completeLinks[i]) ;             
                return nextquespromise ;
            })
        }
        return onequesSolvePromise ;             
        })
   .then(function()                     
   {
     console.log("all ques solved");
   })
   .catch(function(error)
   {
       console.log(error); 
   }) 
   
let q=1 ;

function solveques(qLink)
{
    return new Promise(function(resolve,reject)
    {   
        let gotoQuesPromoise = tab.goto(qLink);
        gotoQuesPromoise.then(function(){
           console.log("Reached question !!",q);  q++ ;
          let waitAndClickPromise = waitandclick('div[data-attr2="Editorial"]');
          return waitAndClickPromise;
        })
        .then(function()
        {
            let getcodepromise = getcode();
            return getcodepromise;
        })
        .then(function()
        {
            let gotoProblemPromise =tab.click('div[data-attr2="Problem"] ') ;
            return gotoProblemPromise ;
        })
        .then(function(){ 
            let pasteCodePromise = pasteCode() ;
            return pasteCodePromise ;
        })
        .then(function()
        {
            let submitPromise = tab.click(".pull-right.btn.btn-primary.hr-monaco-submit") ;
            return submitPromise ;
        })
        .then(function(){
            resolve() ;
        })
        .catch(function(){reject(); })
    }) ;
}

function pasteCode()
{ 
     return new Promise(function (resolve,reject)
 {
    let CheckboxPromise = waitandclick( ".custom-input-checkbox") ; 

    CheckboxPromise.then(function()
    {
        let codeTypePromise = tab.type(".custominput", globalCode) ;
        return codeTypePromise ;
    })
    .then(function()                             //using keyboard functions to cut copy paste the code 
    {
        let controlDownPromise = tab.keyboard.down("Control") ;
        return controlDownPromise ;
    })
    .then(function(){
        let AkeyPromise = tab.keyboard.press("A") ;
        return AkeyPromise ;
    })
    .then(function(){
        let XkeyPromise =  tab.keyboard.press("X") ;
        return XkeyPromise ;
    })
    .then(function(){
        let textboxPromise = tab.click(".overflow-guard") ;
        return textboxPromise ;
    })
    .then(function(){
        let AkeyPromise = tab.keyboard.press("A") ;
        return AkeyPromise ;
    })
    .then(function(){
        let VkeyPromise =  tab.keyboard.press("V") ;
        return VkeyPromise ;
    })
    .then(function(){
        let AkeyDownPromise =  tab.keyboard.down("Control") ;
        return AkeyDownPromise ;
    })
    .then(function(){
        resolve() ;
    })
    .catch(function(err) {reject() ;})
 })  
}


   function waitandclick(selector)
   {
       return new Promise(function(resolve,reject)
       { 
           let waitpromise=tab.waitForSelector(selector, {visible:true}) ;
           waitpromise.then(function(){
               let clickpromise= tab.click(selector) ;
               return clickpromise;
           })
           .then(function(){
               resolve();
           })
           .catch(function(){
               reject() ;
           })
       })
   }
   

   function getcode()
   {
       return new Promise(function(resolve,reject)
       {
            let unlockPromise= lockbtn() ;
            
            unlockPromise.then(function(){
           let waitPromise = tab.waitForSelector(".hackdown-content h3" , {visible:true});
             return waitPromise ;
            })
            .then(function(){
                let allCodeNamesPromise = tab.$$('.hackdown-content h3') ;
                return allCodeNamesPromise;
            })
            .then(function(allTags)
            {
                let languages =[] ;
                for(let i=0 ; i<allTags.length; i++)
                {
                    let namePromise = tab.evaluate(function(element){return element.textContent ;} , allTags[i] ) ;
                    languages.push(namePromise);
                }

                let allNamesPromise = Promise.all(languages) ;
                return  allNamesPromise ;
            })
            .then(function(codenames){    //["C++" ,"PYTHON" , "JAVA"]
                for(let i=0; i<codenames.length ;i++)
                { 
                    if(codenames[i]== "C++") 
                          {idx=i ; break ;}
                }
               let allCodePromise = tab.$$(".hackdown-content .highlight") ;
               return allCodePromise ;
            })
            .then(function(codes){
                //codes = [ <div class="highlight"> </div> , <div class="highlight"> </div> , <div class="highlight"> </div>  ]
                let codePromise = tab.evaluate(function(element){return element.textContent ;} , codes[idx] ) ;
                return codePromise ;
            })
            .then(function(code)
            {
               // console.log(code) ;
               globalCode= code ;
               resolve();
            })
            .catch(function(error) { reject() ;} )
       })
   }

   function lockbtn()
   {
       return new Promise(function(resolve,reject)
       {  
        let waitPromise = tab.waitForSelector('.editorial-content-locked' , {visible:true , timeout:5000});
           waitPromise.then(function()
           {
               let clickpromise =  tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled") ;
               return clickpromise;
           })
           .then(function()
           {   console.log("Unlock Button found") ;
               resolve() ;
           })
           .catch(function(error){
               console.log("Unlock button not found") ;
               resolve();
           })

       })
   } 

