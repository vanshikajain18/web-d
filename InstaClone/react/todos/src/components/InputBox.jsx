import React, { Component } from 'react';


class InputBox extends Component
{
    //constructor and super are called by default on compilation
   state={
       input:"" 
   } ;

   onChangeHandler =(e)=>
   {
       let value= e.target.value ;
       this.setState(
       {
           input: value 
       })
   }
    render()
    {  
        let input = this.state.input ;
        return (
            <div className="input-group mb-3">
                     <input className="form-control" value={input} onChange= { (e)=>this.onChangeHandler(e) }></input>  
                     <button className="btn btn-primary" onClick={() => {this.props.addTodo(input) ; this.state.input="" ; } } > ADD TODO</button>
                     </div>

        )
    }

}

export default InputBox ;