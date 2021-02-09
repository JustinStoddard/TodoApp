import React, { useEffect, useState } from 'react';
import { loadState, saveState } from "../../helpers/localStorage";
import "./App.css";
import Header from "../Header/Header";
import CreateTodoModal from "../CreateTodoModal/CreateTodoModal";
import Todos from "../Todos/Todos";

const App: React.FC = () => {
  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [todoState, setTodosState] = useState(() => {
    const hadPersistedState = loadState("todoAppState") !== undefined;
    if (hadPersistedState) return loadState("todoAppState");
    return [];
  });

  useEffect(() => {
    saveState("todoAppState", todoState);
  }, [todoState]);

  return (
    <div className="app-container">
      <Header setCreateTodoModal={(status) => setCreateTodoModal(status)} />
      <CreateTodoModal
        createTodoModal={createTodoModal}
        todoState={todoState}
        setCreateTodoModal={(status) => setCreateTodoModal(status)}
        setTodosState={(todos) => setTodosState(todos)}
      />
      <Todos
        todoState={todoState}
        setTodosState={(todos) => setTodosState(todos)}
        setCreateTodoModal={(status) => setCreateTodoModal(status)}
      />
    </div>
  );
};

export default App;
