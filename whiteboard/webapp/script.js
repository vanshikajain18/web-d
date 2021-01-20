let canvas= document.querySelector("#canvas") ;
let ctx = canvas.getContext("2d") ;
// we get a ctx object 

// object destructuring
let {top :canvasTop} =canvas.getBoundingClientRect() ;

canvas.height= window.innerHeight -canvasTop ;
canvas.width= window.innerWidth ;

window.addEventListener("resize" ,function(){
    // to adjust the canvas acc to the window size
    canvas.height= window.innerHeight -canvasTop ;
    canvas.width= window.innerWidth ;
})

let isMouseDown=false ;

canvas.addEventListener("mousedown",function(e){
  isMouseDown=true ;
  let x= e.clientX ;
  let y= e.clientY - canvasTop ;
  ctx.beginPath() ; //start a line
  ctx.moveTo(x,y) ;
})

canvas.addEventListener("mousemove",function(e){
  if(isMouseDown)
  {  let x= e.clientX ;
    let y= e.clientY - canvasTop ;
    ctx.lineTo(x,y) ;
    ctx.stroke() ; //show a line 
  }
})

canvas.addEventListener("mouseup",function(e){
      isMouseDown=false ;
})