import React from "react";
import "./CreateTodoModal.css";
import CreateTodo from "../CreateTodo/CreateTodo";

interface Todo {
  title: String,
  text: String,
  complete: Boolean
};

type Todos = Todo;

interface Props {
  createTodoModal: boolean,
  todoState: Todos[],
  setCreateTodoModal: (status: boolean) => void,
  setTodosState: (todos: Todos[]) => void
};

const CreateTodoModal: React.FC<Props> = ({ createTodoModal, todoState, setCreateTodoModal, setTodosState }) => {

  const handleCloseCreateTodo = () => {
    setCreateTodoModal(false);
  };

  if (!createTodoModal) return null;
  return (
    <div className="create-todo-modal-container" onClick={handleCloseCreateTodo}>
      <div className="create-todo-modal-content-container" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}>
        <div className="create-todo-modal-close-container" onClick={handleCloseCreateTodo}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </div>
        <h1 className="create-todo-modal-header">Create a todo</h1>
        <CreateTodo todoState={todoState} setTodosState={(todos) => setTodosState(todos)} setCreateTodoModal={(status: boolean) => setCreateTodoModal(status)} />
      </div>
    </div>
  );
};

export default CreateTodoModal;