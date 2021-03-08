//imrc
import React, { Component } from 'react';
import InputBox from "./components/InputBox";
import Todos from "./components/Todos";

class App extends Component {
  state = {
    todos :
    [{ id:"1", todo:"Learn HTML" }, 
    { id:"2", todo:"Learn CSS" }, 
    { id:"3", todo:"Learn JS" }, 
    { id:"4", todo:"Learn JSX" }, 
    { id:"5", todo:"Learn React" }] ,
    id:6 
    }

    deleteTodo= (id) =>
    {
        let todoArray= this.state.todos ;
        let updatedTodos = todoArray.filter(todoObj =>{
          return todoObj.id != id ;
        })

        this.setState({
          todos: updatedTodos 
        })
    }

    addTodo= (newTodo) =>
    {
      let todoArray = [...this.state.todos , { id:this.state.id , todo:newTodo }]
      this.setState(
      {
        todos :todoArray ,
        id: this.state.id +1 
      })
    }

 
  render() { 
    console.log("render") ;
    return ( 
      <div className="container">
        <InputBox  addTodo={this.addTodo} />
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>

     );
  }
}
 
export default App;