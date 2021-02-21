let names=["penny", "sheldon", "howard", "leonard","amy"] ;

function Hello(props)   //component names start with uppercase   
{
    return <h1>Hello fromm {props.name} component!</h1> ;    //use {} to write JS code in JSX 
    //only the tag <h1>--</h1> is JSX code 
}

function BigHello()
{
    return  <React.Fragment>
    {
        names.map(function(name){
            return <Hello name={name} key={name} > </Hello>
        })
    }
   </React.Fragment>
}


// (  What to render , where to render  );
ReactDOM.render(<BigHello/> , document.getElementById("root") ) ;