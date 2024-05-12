import React, { useState } from "react";
import "./Todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTodo } from "../../services/todo.api";
import { toast } from "react-toastify";

function Todo({ todo, update, toggleComplete, remove }) {

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleClick = () => {
    //NOTE - deleteTodo is a function that will delete the todo in the database
    //NOTE - deleteTodo calls the API
    deleteTodo(todo.id);
    //NOTE - remove is a function that will remove the todo from the state
    remove(todo.id);
    toast.success("Todo deleted successfully");
  };

  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = (evt) => {
    evt.preventDefault();
    update(todo.id, text);
    toggleFrom();
  };

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const toggleCompleted = (evt) => {
    toggleComplete(evt.target.id);
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input onChange={handleChange} value={text} type="text" />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => toggleComplete(todo.id)}
        />
                <li
            id={todo.id}
            onClick={toggleCompleted}
            className={todo.isDone ? "Todo-task completed" : "Todo-task"}
          >
            {todo.text}
          </li>
        <div className="Todo-buttons">
          <button onClick={toggleFrom}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={handleClick}>
            <FontAwesomeIcon id={todo.id} icon={faTrash} />
          </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
