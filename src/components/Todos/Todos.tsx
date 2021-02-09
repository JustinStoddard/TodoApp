import React, { Fragment, useState, useEffect } from "react";
import "./Todos.css";

interface Todo {
  title: String,
  text: String,
  complete: Boolean
};

type Todos = Todo;

interface Props {
  todoState: Todos[],
  setTodosState: (todos: Todos[]) => void,
  setCreateTodoModal: (status: boolean) => void
};

const Todos: React.FC<Props> = ({ todoState, setTodosState, setCreateTodoModal }) => {
  const [renderedTodos, setRenderedTodos] = useState<Todos[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleDeleteTodo = (index: number) => {
    const newTodos = todoState.filter((todo, i) => {
      if (index !== i) {
        return todo;
      }
      return null;
    });
    setTodosState(newTodos);
  };

  const handleCompleteTodo = (index: number, value: boolean) => {
    let todos = JSON.parse(JSON.stringify(todoState));
    todos[index].complete = value;
    setTodosState(todos);
  };

  const handleCreateTodo = () => {
    setCreateTodoModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setRenderedTodos(todoState);
    } else {
      const searchedTodos = todoState.filter((todo, i) => {
        const title = todo.title.toLowerCase();

        if (title.indexOf(value.toLowerCase()) !== -1) {
          return todo;
        }
        return null;
      });
      setRenderedTodos(searchedTodos);
    }
    setSearchValue(value);
  };

  useEffect(() => {
    setRenderedTodos(todoState);
  }, [todoState]);

  return (
    <Fragment>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a todo"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {todoState.length ? (
        <div className="todos-container">
          {renderedTodos.map((todo: Todo, i: number) => {
            const todoTitle = todo.title;
            const todoText = todo.text;
            const todoIsComplete = todo.complete;

            return (
              <div key={i} className="todo-container">
                <div className="todo-title-container">
                  <h1 className={`todo-title ${todoIsComplete && "todo-complete"}`}>{todoTitle}</h1>
                </div>
                <div className="todo-text-container">
                  <h1 className={`todo-text ${todoIsComplete && "todo-complete"}`}>{todoText}</h1>
                </div>
                <div className="todo-action-container">
                  <button className="todo-complete-button" onClick={() => handleCompleteTodo(i, todoIsComplete ? false : true)}>
                    {todoIsComplete ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    )}
                  </button>
                  <button className="todo-delete-button" onClick={() => handleDeleteTodo(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-todos-container">
          <div className="no-todos-content-container">
            <h1 className="no-todos-text">You dont have any todos</h1>
            <button className="no-todos-button" onClick={handleCreateTodo}>
              ADD A TODO
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Todos;