import React, { Component } from 'react';


class Todos extends Component
{
    //constructor and super are called by default on compilation
   state={ } ;

    render()
    {   let todos= this.props.todos ;
        let deleteTodo= this.props.deleteTodo ;
        console.log("todos") ;
        return ( <div className="todos">
              {
                 todos.map( todoObj => {
                     return <div className="input-group mb-3" key={todoObj.id}>
                     <input className="form-control" value={todoObj.todo} disabled></input>  
                     <button className="btn btn-danger" onClick={()=>{deleteTodo(todoObj.id) }}> DELETE</button>
                     </div>
                })
                }
            </div>
        ) 

    }

}

export default Todos ;