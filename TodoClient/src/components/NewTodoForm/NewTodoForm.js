import React, { useState } from "react";
import { addTodo } from "../../services/todo.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./NewTodoForm.css";

function NewTodoForm({ createTodo }) {

  const [text, setText] = useState('');

  const handleChange = evt => setText(evt.target.value);

  const handleAddTodo = async (todoText) => {
    try {
      const data = await addTodo({text: todoText, isDone: false});
      createTodo(data);
      toast.success('Todo added successfully');
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error('Failed to add todo. Please try again.');
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
      handleAddTodo(text);
      setText('');
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <label htmlFor="text">New todo</label>
      <input 
        value={text}
        onChange={handleChange}
        id="text"  
        type="text"
        name="text"
        minLength={4}
        placeholder="New Todo"  
        required
      />
      <button type="submit">Add Todo</button>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </form>
  );
}

export default NewTodoForm;
