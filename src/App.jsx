import { useState,useReducer } from 'react'

import './App.css'
const initialState = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  },
  {
    "userId": 1,
    "id": 11,
    "title": "vero rerum temporibus dolor",
    "completed": true
  },
  {
    "userId": 1,
    "id": 12,
    "title": "ipsa repellendus fugit nisi",
    "completed": true
  },
  {
    "userId": 1,
    "id": 13,
    "title": "et doloremque nulla",
    "completed": false
  },
  {
    "userId": 1,
    "id": 14,
    "title": "repellendus sunt dolores architecto voluptatum",
    "completed": true
  },
  {
    "userId": 1,
    "id": 15,
    "title": "ab voluptatum amet voluptas",
    "completed": true
  },
  {
    "userId": 1,
    "id": 16,
    "title": "accusamus eos facilis sint et aut voluptatem",
    "completed": true
  },
  {
    "userId": 1,
    "id": 17,
    "title": "quo laboriosam deleniti aut qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 18,
    "title": "dolorum est consequatur ea mollitia in culpa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 19,
    "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    "completed": true
  },
  {
    "userId": 1,
    "id": 20,
    "title": "ullam nobis libero sapiente ad optio sint",
    "completed": true
  }
];


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
