import React, { useEffect, useState } from "react";
import "./todo.css";
import { ReactComponent as CloseBtn } from "../asset/close-btn.svg";
import { ReactComponent as CancelBtn } from "../asset/cancel-btn.svg";
import { ReactComponent as EditBtn } from "../asset/edit-btn.svg";
import { ReactComponent as CheckedBtn } from "../asset/checked-btn.svg";
import { ReactComponent as UnCheckedBtn } from "../asset/unchecked-btn.svg";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState("");
  const [editedText, setEditedText] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodos = (prevTodos) => {
      return [
        ...prevTodos,
        {
          id: new Date().getTime(),
          todoText: todo,
          isCompleted: false,
          ...todo,
        },
      ];
    };
    setTodos(newTodos);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const newTodos = (prevTodos) => prevTodos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (e, id) => {
    e.preventDefault();
    const newTodos = [...todos].map((item) => {
      if (id === item.id) {
        item.todoText = editedText;
      }
      return item;
    });
    setTodos(newTodos);
    setEditedTodo(null);
  };

  const handleEdit = (e) => {
    setEditedText(e.target.value);
  };

  const cancelEdit = () => {
    setEditedTodo("");
  };

  const toggleTodoState = (id) => {
    const newTodos = [...todos].map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodos(newTodos);
  };

  const setInputFocus = (input) => {
    if (input !== null) {
      input.focus();
    }
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedData = JSON.parse(json);
    if (loadedData) {
      setTodos(loadedData);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  return (
    <div className="todo-card">
      <div className="todos-wrapper">
        <h3 className="todo-heading">Todos</h3>
        <form action="" className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            onChange={handleChange}
            value={todo}
            ref={setInputFocus}
          />
          <button type="submit" className="btn-add">
            Add +
          </button>
        </form>
        {todos.map((item) => (
          <div className="todo-item" key={item.id}>
            {item.id === editedTodo ? (
              <div className="todo-wrapper">
                <form onSubmit={(e) => editTodo(e, item.id)}>
                  <input
                    type="text"
                    className="todo-input input-edit"
                    onChange={handleEdit}
                    defaultValue={item.todoText}
                    ref={setInputFocus}
                  />
                </form>
                <button onClick={cancelEdit} className="todo-controls cancel">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="todo-wrapper">
                <span
                  className={
                    "todo-text " + (item.isCompleted === true && "completed")
                  }
                >
                  {item.todoText}
                </span>
                <div className="todo-controls">
                  {item.isCompleted === true ? (
                    <CheckedBtn onClick={() => toggleTodoState(item.id)} />
                  ) : (
                    <UnCheckedBtn onClick={() => toggleTodoState(item.id)} />
                  )}
                  <CloseBtn onClick={() => deleteTodo(item.id)} />
                  <EditBtn onClick={() => setEditedTodo(item.id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
