import React,{Fragment, useState, useEffect} from 'react'
import EditTodo from './editTodo';

const ListTodo = () => {
   const [todos, setTodos] = useState([]);

   //delete todo
   const deleteTodo = async (id)=>{
       try {
           const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
               method : "DELETE"
           });
          setTodos(todos.filter(todo => todo.todoid !== id));
       } catch (err) {
           console.error(err.message);
       }
   }

   //get all todos
    const getTodos = async ()=>{
       try {
               const response = await fetch("http://localhost:5000/todos");
               const jsonData = await response.json();

               setTodos(jsonData);
              // console.log(jsonData);
       } catch (err) {
           console.error(err.message);
       }
    };
    useEffect(()=>{
       getTodos();
    },[]);
    console.log(todos);
    return(
        <Fragment>

   <table className="table table-dark table-hover mt-4">
    <thead>

      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
        {todos.map(todo=>(
           <tr key={todo.todoid}>
               <td>{todo.description}</td>
               <td><EditTodo todo={todo}/></td>
               <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todoid)}>Delete</button></td>
           </tr>
        ))

        }

    </tbody>
  </table>
        </Fragment>
    );
};

export default ListTodo;