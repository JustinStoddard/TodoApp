import React from "react";
import "./Header.css";

interface Props {
  setCreateTodoModal: (status: boolean) => void
};

const Header: React.FC<Props> = ({ setCreateTodoModal }) => {

  const handleCreateTodo = () => {
    setCreateTodoModal(true);
  };

  return (
    <div className="header-container">
      <h1 className="header-text">The Todo App</h1>
      <div className="shown-button">
        <div className="create-todo-button-container">
          <h1 className="create-todo-button-text">Create todo</h1>
          <button data-testid="create-todo-button" className="create-todo-button-icon-container" onClick={handleCreateTodo}>
            <svg className="create-todo-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </button>
        </div>
      </div>
      <div className="hidden-button">
        <button data-testid="create-todo-button" className="create-todo-button-icon-container" onClick={handleCreateTodo}>
          <svg className="create-todo-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default Header;