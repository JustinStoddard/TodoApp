import React, { useState } from "react";
import "./CreateTodo.css";

interface Todo {
  title: String,
  text: String,
  complete: Boolean
};

type Todos = Todo;

interface Props {
  setTodosState: (todos: Todos[]) => void,
  setCreateTodoModal: (status: boolean) => void,
  todoState: Todos[]
};

const CreateTodo: React.FC<Props> = ({ todoState, setTodosState, setCreateTodoModal }) => {
  const [todoTitleValue, setTodoTitleValue] = useState<string>("");
  const [todoTextValue, setTodoTextValue] = useState<string>("");
  const [todoValueError, setTodoValueError] = useState<boolean>(false);

  const handleCreateTodo = () => {
    if (todoTextValue !== "" && todoTitleValue !== "") {
      const newTodo = {
        title: todoTitleValue,
        text: todoTextValue,
        complete: false
      };
      setTodoValueError(false);
      setTodosState([newTodo, ...todoState]);
      setCreateTodoModal(false);
      setTodoTextValue("");
    } else {
      setTodoValueError(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitleValue(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTextValue(e.target.value);
  };

  return (
    <div className="create-todo-input-container">
      <input
        type="text"
        placeholder="Title"
        className="create-todo-input top-input"
        value={todoTitleValue}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Message"
        className="create-todo-input"
        value={todoTextValue}
        onChange={handleTextChange}
      />
      {todoValueError && (
        <h1 className="error-message">Cannot create a todo with an empty title or message</h1>
      )}
      <button className="create-todo-submit-button" onClick={handleCreateTodo}>
        Create todo
      </button>
    </div>
  );
};

export default CreateTodo;