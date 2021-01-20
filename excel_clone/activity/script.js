const $= require("jquery") ;

$(function(){
    let sheetsDB=[] ;
    let db ;
    let curVisCells ;
    let lsc ;
    let flag=0 ;
    let sheetId = 1;
    initDB () ;

    function initDB()        //initialize db
    {   
        let newDb=[] ;
        let visitedCells =  [] ;
        for(let i=0;i<100;i++)
        { let row=[] ;
            for(let j=0;j<26;j++)
            {
                let name= String.fromCharCode(j+65) + (i+1) ;
                let cellObject= {
                    "name" :name ,
                    "value" : "" ,
                    "formula":"" ,
                    "children" :[] ,
                    "parents" :[] ,
                    "visited" : false 
                }
                row.push(cellObject) ;
            }
            newDb.push(row) ;
        }

       sheetsDB.push({newDb, visitedCells}) ;
       db=newDb ;
       curVisCells = visitedCells ;
    }

    function addNewDB()
    {   
        let newDb  =[] ;
        let visitedCells =  [] ;
        for(let i=0;i<100;i++)
        { let row=[] ;
            for(let j=0;j<26;j++)
            {
                let name= String.fromCharCode(j+65) + (i+1) ;
                let cellObject= {
                    "name" :name ,
                    "value" : "" ,
                    "formula":"" ,
                    "children" :[] ,
                    "parents" :[] ,
                    "visited" : false 
                }
                row.push(cellObject) ;
            }
            newDb.push(row) ;
        }

       sheetsDB.push({newDb,visitedCells}) ;
    }

   $(".cell").on("click",function(){
          
      let rowid= Number($(this).attr("rowid")) ;
      let colid= Number($(this).attr("colid")) ;
      let address= String.fromCharCode(colid+65) + (rowid+1) ;
      let cellObject= db[rowid][colid] ;
      $("#address").val(address) ;
      $("#formula").val(cellObject.formula) ;
      console.log(address) ;
   })    

   $(".cell").on("blur",function(){
      lsc=this ; //this returns that element jispe ye function chala hoga
    let rowid= Number($(this).attr("rowid")) ;
    let colid= Number($(this).attr("colid")) ;
    let cellObject= db[rowid][colid] ;   
    let value = $(this).text() ;      //ui value
    if(value!=" " && cellObject.value != value)
    {  
        if(!cellObject.visited )
        {
            cellObject.visited = true ;
            curVisCells.push({rowid,colid}) ;
        }

        if(cellObject.formula)       //FORMULA TO VALUE 
        {   
            removeFormula(cellObject) ;
            cellObject.formula="" ;
           $("#formula").val(" ") ;
           console.log(db) ;
        }
        cellObject.value=value ;
        if(cellObject.children)
        {
            updateChildren(cellObject) ;     
        }
    }
    
   })

   $("#formula").on("blur",function(){
      let formula= $(this).val() ;
      let rowid= Number($(lsc).attr("rowid")) ;
    let colid= Number($(lsc).attr("colid")) ;
    let cellObject= db[rowid][colid] ;  

    cycleDetection(formula, cellObject) ;

      if( flag ==0 && formula && cellObject.formula != formula)
      {   
        if(!cellObject.visited )
        {
            cellObject.visited = true ;
            curVisCells.push({rowid,colid}) ;
        }

          if(cellObject.formula)    //if formula already exists FORMULA TO FORMULA UPDATE
          {
             removeFormula(cellObject); 
          }
          cellObject.formula = formula ;
          let value= solve(formula,cellObject) ;
          $(lsc).text(value) ;
          cellObject.value= value ; 
              updateChildren(cellObject) ;      //REQUIRED TO UPDATE VALUE TO FORMULA 
      }

   })

   $(".sheet").on("click",function(){
    let isActive = $(this).hasClass("active-sheet") ;

    if(!isActive)
    {
        $(".active-sheet").removeClass("active-sheet");
        $(this).addClass("active-sheet") ;
        // console.log("active") ;
        clearUI() ;
        //set DB
        let sid = $(this).attr("sid") ;
        db= sheetsDB[sid].newDb ; 
        curVisCells = sheetsDB[sid].visitedCells ;        
        setUI() ;  //SET UI
    }
   })

   $(".add-sheet").on("click", function(){
        sheetId++ ;
        let sheetToBeAdded = `<div class="sheet" sid ="${sheetId-1}"> Sheet ${sheetId} </div>` ;
        $(".sheet-list").append(sheetToBeAdded) ;
        addNewDB() ;

        $(`div[sid=${sheetId - 1}]`).on("click",function(){
            let isActive = $(this).hasClass("active-sheet") ;

            if(!isActive)
           {
               $(".active-sheet").removeClass("active-sheet");
               $(this).addClass("active-sheet") ;

               clearUI() ;
               //set DB
               let sid = $(this).attr("sid") ;
               db= sheetsDB[sid].newDb ; 
               curVisCells = sheetsDB[sid].visitedCells ;        
               setUI() ;  //SET UI
           }

        })
   })

   function clearUI()
   {  
        $("#address").val("");
       $("#formula").val("");
      for(let i=0 ;i<curVisCells.length ;i++)
      {
          let rowid = curVisCells[i].rowid ;
          let colid =curVisCells[i].colid ;
          $(`div[rowid=${rowid}][colid=${colid}]`).text("") ; 
      }
   }

   function setUI()
   {
    for(let i=0 ;i<curVisCells.length ;i++)
    {
        let rowid = curVisCells[i].rowid ;
        let colid =curVisCells[i].colid ;
        let cellObject = db[rowid][colid] ;
        $(`div[rowid=${rowid}][colid=${colid}]`).text(cellObject.value) ; 
    }  
   }

   function updateChildren(cellObject)
   {
       let children = cellObject.children ;
       for(let i=0 ;i<children.length ; i++)
       {  
           let {rowid, colid} = getRowColId(children[i]);
           let child= db[rowid][colid] ;
         let newValue= solve(child.formula);
           child.value= newValue ;

           $(`div[rowid=${rowid}][colid= ${colid}]`).text(newValue) ;
          if(child.children.length >0) updateChildren(child) ;
       }
   }
   
   
   function solve(formula,cellObject)
   {
    let fComps= formula.split(" ");    //[(,A1,+,A2,)]

    for(let i=0 ;i<fComps.length ;i++)
    {
        if(fComps[i][0] >="A" && fComps[i][0] <="Z")     //A1 //A2
        {
            let {rowid,colid} = getRowColId(fComps[i]) ;
           let fCompsCellObject = db[rowid][colid] ;
           let fCompVal = fCompsCellObject.value ;
            
           formula = formula.replace(fComps[i] ,fCompVal) ;

           if(cellObject){
           fCompsCellObject.children.push(cellObject.name) ;  //push child name in parent 
           cellObject.parents.push(fCompsCellObject.name) ;   // push parent in child
           }
        }
    }
     let value =eval(formula) ;  //stack infix evaluation
     return value ;
   }

   function removeFormula(cellObject)
   {
    for(let i=0 ;i<cellObject.parents.length ;i++)
    {
        let address = cellObject.parents[i] ;
        let {rowid,colid} = getRowColId(address) ;
        let parent= db[rowid][colid] ;
        
        let newChildren = parent.children.filter(function(child){
          return cellObject.name != child ;       //keeps only those element in array that return true 
        }) ;

        parent.children = newChildren ;
    }
    cellObject.parents = [] ;
   }

   //utility function
   function getRowColId(address)
   {
       let rowid = Number(address.substring(1))-1;
       let colid= address.charCodeAt(0) -65 ;  
       return {
           rowid,
           colid
       }
   }

   function cycleDetection(formula, cellObject)
   { 
       let name= cellObject.name ; //B1 
    let fComps= formula.split(" ");  

    for(let i=0 ;i<fComps.length ;i++) 
    {
    if(fComps[i][0] >="A" && fComps[i][0] <="Z")     //A1 //A2      
    {
        let {rowid,colid} = getRowColId(fComps[i]) ;      
       let fCompsCellObject = db[rowid][colid] ;  //A1

       for(let i=0 ;i<fCompsCellObject.parents.length ; i++)
       {
           if(fCompsCellObject.parents[i]== name)    
           { $(lsc).text("error:cycle detected") ; 
              flag =1 ;
             return ;}

        //    let parent= fCompsCellObject.parents[i] ;
           let {rowid,colid} = getRowColId(fCompsCellObject.parents[i] ) ;      
          let parent = db[rowid][colid] ;
           if(parent.parents.length >0)
           {    
               console.log(fCompsCellObject.name) ;
                cycleDetection(fCompsCellObject.formula ,cellObject) ; 
           }     //(formula of A1,B1) 
       }
    }
    }
   }

})