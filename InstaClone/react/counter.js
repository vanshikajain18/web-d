// class based component // stateful component
class Counter extends React.Component
{
// 1. Initially constructor method call
constructor(){
   super() ; //calls the constructor of the PARENT CLASS (React.Component)
   // initialize this.state 
   this.state={
       count :0 
   }
}

increment=() =>{
// use set state function to alter the state 
// setState => render method is called again

this.setState({
    count:this.state.count+1
})
}

decrement=() =>{
    this.setState({
         count : this.state.count -1 })

}

reset=() =>{
    this.setState ({ 
        count : 0 })
}

//2. render function is called 
render(){
    return  <React.Fragment>
  <div className="container">
  <p>{this.state.count}</p>   
  <button className="btn btn-primary" onClick={this.increment} > + </button>
  <button className="btn btn-danger" onClick={this.decrement}> - </button>
  <button className="btn btn-warning" onClick={this.reset}> RESET </button>
  </div>
        </React.Fragment>
}
}

ReactDOM.render( <Counter/> , document.getElementById("root") ) ;