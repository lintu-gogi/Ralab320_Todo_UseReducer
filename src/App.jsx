import { useState,useReducer } from 'react'

import './App.css'

/*function App() {
  const [count, setCount] = useState(0);
  const []= useReducer(reducer,{count:0});
  function increment(){
    setCount(prevCount=>prevCount+1)
  }
  function decrement(){
    setCount(prevCount=>prevCount-1)
  }
  return (
    <>
    <h1>React ToDo List</h1>
    <button onClick={decrement}>--</button>
    <span>{count}</span>
    <button onClick={increment}>++</button>
    </>
  )
}
function reducer(){

}*/
//reducer function should be outside App function
//reducer function is called by the dispatcher fuction. We can pass type, payload etc.
//reducer takes 2 parameters from dispacher function. 1st argument is the current state (where the application is currently at)
//2nd argument is passed from the dispatcher function. eg here is the type 'add_todo'.
//reducer returns a new updated state.
function reducer(todos,action){
  switch(action.type){
    case 'add_todo':
      //spread operator for arrays. Here all current todos plus new todos adiing by newTodo function. Need to pass the name of the todo.
      //name of the todo is passed as payload from dispatcher
      return [...todos,newTodo(action.payload.name)]
    case 'delete_todo': 
      return todos.filter(todo=> todo.id !== action.payload.id)

      default:
        return todos;
  }
}
function newTodo(name){
  //New todo with the name passed from 1.reducer 2.dispatcher 3.from the input
  return({id: Date.now(), name:name,completed:false })
}
function App() {
  const [todos,dispatch]= useReducer(reducer,[]);
  const [name,setName]= useState('');

  function handleSubmit(e){
    e.preventDefault();
    dispatch({type:'add_todo',payload:{name:name}});
    setName('');
  }
  function setNameFunc(e){
  
    setName(e.target.value)
      
  }
  
  return (
    <>
    <h1>React ToDo List</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={setNameFunc}></input>
      <button type='submit'>Add Todo</button>
    
      {todos.map(todo=>{
        return (<TodoComponent key={todo.id} todo={todo} dispatch={dispatch}/>)
      })}
      
      </form>
    </>
  )
}
//{<button type='click' value={todo.id} onClick={deleteTodo}>Delete</button>}
export default App
function TodoComponent({todo,dispatch}){
  return (
    <div>
      <span>{todo.name}</span>
      <button onClick={()=>dispatch({type : 'delete_todo',payload :{id: todo.id}})}>Delete</button>
    </div>
  )
}
