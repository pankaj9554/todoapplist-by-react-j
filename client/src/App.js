import React, { useState,useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.gif';
import useSound from 'use-sound';
import   "./App.css"
import sound from './boop.mp3';
import axios from 'axios';

const App = () => {
  const [todoapp, setTodoapp] = useState([]);
   const [play]=useSound(sound)
   const [loding,setLoding]=useState(false)





  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoding(true)
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodoapp(data);
     
        
        if(loding) {
          setLoding(false);
        toast.success("  data get  successfully ");
       play()
          
        return
        }

        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("  data fecting  successfully ");
        setLoding(false);
      }
    };

    fetchData();
  }, [play]); 











  const handleDelete = async (id) => {
  const answer=window.confirm("are  you sure you want to delete this item")
  if(!answer) return

  
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodoapp((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      play()

      toast.error("  data deleted successfully ");

    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error("  internal server error ");
    }
  };

  if(loding){
    return <img src={logo} className='center'   alt="Logo" />
  }

  return (
    <div>
      <ToastContainer/>
      <h1   className="App">Todo List  App</h1>
      <hr/>
      <ul>
        {todoapp.map((todo) => (
          <li key={todo.id}>
          <span   style={{
          
            fontSize: '18px',

            }}     >   <strong className="badge "  > {todo.userId} </strong>   {"      "}   {todo.title}</span>
            <button
            
            
             onClick={() => handleDelete(todo.id)}>Delete</button>
             <hr/>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default App;

