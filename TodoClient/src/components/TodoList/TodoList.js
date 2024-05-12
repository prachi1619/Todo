import React, { useState ,useEffect} from "react";
import Todo from "../Todo/Todo";
import NewTodoForm from "../NewTodoForm/NewTodoForm";
import "./TodoList.css";
import { fetchTodos, updateTodo } from "../../services/todo.api";
import { toast } from "react-toastify";

export function TodoList() {
  
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    fetchData();
  }, []);

  const create = (newTodo) => {
    const [newTodoObject] = [newTodo]; 
    setTodos(prevTodos => {
      const joinedArray = prevTodos.concat(newTodoObject.response[0]);
      return joinedArray;
    });
  };

  const update = (id, updtedTask) => {
    const todo = todos.find(t => t.id === id);
    todo.text = updtedTask;
    updateTodo(id, todo).then(() => {
      fetchTodos().then((result) => {
        setTodos(result.data);
      });
      toast.success('Todo updated successfully');
    });
  };

const toggleComplete = async id => {

  // Find todo by id
  const todo = todos.find(t => t.id === id);  

  // Toggle todo.isDone locally
  todo.isDone = !todo.isDone; 

  try {
    // Make API call to update
    await updateTodo(id, todo)

    setTodos(prev => 
      prev.map(t => 
        t.id === id ? todo : t  
      )
    );

    toast.success('Todo updated successfully');

  } catch (err) {
    console.error(err);
    // Revert local change if API failed
    todo.isDone = !todo.isDone;
  }

}
  

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))  
  }

  const todosList =
    (todos && todos.length > 0)? (
      todos.map((todo) => (
        <Todo
          toggleComplete={toggleComplete}
          update={update}
          key={todo.id}
          todo={todo}
          remove={removeTodo}
        />
      ))
    ) : (
      <p>No todos available.</p>
    );

  return (
    <div className="TodoList">
      <h1>
        Todo List <span>Stay on top of your day with an easy-to-use to-do list</span>
      </h1>
      <ul>{todosList}</ul>
      <NewTodoForm createTodo={create} />
    </div>
  );
}

export default TodoList;
