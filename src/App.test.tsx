import React from 'react';
import { fireEvent } from '@testing-library/react';
import * as ReactDOM from "react-dom";
import { addTodo, completeTodo, deleteTodo, searchTodo } from "./helpers/todoHelpers";
import App from "./components/App/App";

describe("Add A Todo", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<App />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Checks if a user can add a todo", () => {
    const createTodoModalButton = container.querySelector("[data-test='show-create-todo-modal']");

    //Create todo
    fireEvent.click(createTodoModalButton);
    const createTodoTitleInput = container.querySelector("[data-test='title-input']");
    const createTodoTextInput = container.querySelector("[data-test='text-input']");
    const createTodoButton = container.querySelector("[data-test='create-todo-button']");

    fireEvent.change(createTodoTitleInput, { target: { value: "first" } });
    fireEvent.change(createTodoTextInput, { target: { value: "foo" } });
    fireEvent.click(createTodoButton);

    //Check if todo was created
    const newTodoCard = container.querySelector("[data-test='first-0']");
    expect(newTodoCard).toBeInTheDocument;
  });

  it("Checks if addTodo helper adds a todo to todos", () => {
    const todos = [
      { id: 2, title: "second", text: "bar", complete: false },
      { id: 1, title: "first", text: "foo", complete: false }
    ];
    const newTodo = { id: 3, title: "third", text: "baz", complete: false };
    const expected = [
      { id: 3, title: "third", text: "baz", complete: false },
      { id: 2, title: "second", text: "bar", complete: false },
      { id: 1, title: "first", text: "foo", complete: false }
    ];
    const result = addTodo(todos, newTodo);
    expect(result).toEqual(expected);
  });
});

describe("Delete A Todo", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<App />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Checks if a user can delete a todo", () => {
    const createTodoModalButton = container.querySelector("[data-test='show-create-todo-modal']");

    //Create first card
    fireEvent.click(createTodoModalButton);
    const createTodoTitleInput = container.querySelector("[data-test='title-input']");
    const createTodoTextInput = container.querySelector("[data-test='text-input']");
    const createTodoButton = container.querySelector("[data-test='create-todo-button']");
    
    fireEvent.change(createTodoTitleInput, { target: { value: "first" } });
    fireEvent.change(createTodoTextInput, { target: { value: "foo" } });
    fireEvent.click(createTodoButton);

    //Create second card
    fireEvent.click(createTodoModalButton);
    fireEvent.change(createTodoTitleInput, { target: { value: "second" } });
    fireEvent.change(createTodoTextInput, { target: { value: "bar" } });
    fireEvent.click(createTodoButton);

    //Get cards
    const firstNewTodoCard = container.querySelector("[data-test='first-1']");
    const secondNewTodoCard = container.querySelector("[data-test='first-0']");

    //Delete first card
    const firstCardDeleteButton = container.querySelector("[data-test='first-1-delete-button']");
    fireEvent.click(firstCardDeleteButton);

    //Check if first card is deleted and second card is still there.
    expect(firstNewTodoCard).not.toBeInTheDocument;
    expect(secondNewTodoCard).toBeInTheDocument;
  });

  it("Checks if deleteTodo helper deletes a todo from todos", () => {
    const todos = [
      { id: 2, title: "third", text: "baz", complete: false },
      { id: 1, title: "second", text: "bar", complete: false },
      { id: 0, title: "first", text: "foo", complete: false }
    ];
    const expected = [
      { id: 1, title: "second", text: "bar", complete: false },
      { id: 0, title: "first", text: "foo", complete: false }
    ];
    const result = deleteTodo(todos, 2);
    expect(result).toEqual(expected);
  });
});

describe("Mark a todo as complete", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<App />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Checks if a user can mark a todo as complete", () => {
    const createTodoModalButton = container.querySelector("[data-test='show-create-todo-modal']");

    //Create todo
    fireEvent.click(createTodoModalButton);
    const createTodoTitleInput = container.querySelector("[data-test='title-input']");
    const createTodoTextInput = container.querySelector("[data-test='text-input']");
    const createTodoButton = container.querySelector("[data-test='create-todo-button']");

    fireEvent.change(createTodoTitleInput, { target: { value: "first" } });
    fireEvent.change(createTodoTextInput, { target: { value: "foo" } });
    fireEvent.click(createTodoButton);

    //Complete the todo
    const newTodoCard = container.querySelector("[data-test='first-0']");
    const newTodoCardCompletButton = newTodoCard.querySelector("[data-test='first-0-complete-button']");
    fireEvent.click(newTodoCardCompletButton);

    //Check if the title on todo has completed class
    const newTodoCardTitle = container.querySelector("[data-test='first-0-title']");
    expect(newTodoCardTitle).toHaveClass("todo-complete");
  });

  it("Checks if completeTodo helper marks a todo as complete", () => {
    const todos = [
      { id: 1, title: "second", text: "bar", complete: false },
      { id: 0, title: "first", text: "foo", complete: false }
    ];
    const expected = [
      { id: 1, title: "second", text: "bar", complete: true },
      { id: 0, title: "first", text: "foo", complete: false }
    ];
    const result = completeTodo(todos, 1, true);
    expect(result).toEqual(expected);
  });
});

describe("Search for a todo", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<App />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Checks if a user can search for a todo", () => {
    const createTodoModalButton = container.querySelector("[data-test='show-create-todo-modal']");

    //Create first card
    fireEvent.click(createTodoModalButton);
    const createTodoTitleInput = container.querySelector("[data-test='title-input']");
    const createTodoTextInput = container.querySelector("[data-test='text-input']");
    const createTodoButton = container.querySelector("[data-test='create-todo-button']");
    
    fireEvent.change(createTodoTitleInput, { target: { value: "first" } });
    fireEvent.change(createTodoTextInput, { target: { value: "foo" } });
    fireEvent.click(createTodoButton);

    //Create second card
    fireEvent.click(createTodoModalButton);
    fireEvent.change(createTodoTitleInput, { target: { value: "second" } });
    fireEvent.change(createTodoTextInput, { target: { value: "bar" } });
    fireEvent.click(createTodoButton);

    //Get cards
    const firstNewTodoCard = container.querySelector("[data-test='first-1']");
    const secondNewTodoCard = container.querySelector("[data-test='first-0']");
    
    //Search for card
    const todoSearchField = container.querySelector("[data-test='todo-search']");
    fireEvent.change(todoSearchField, { target: { value: "first" } });

    //Check if the first card is the only one showing up
    expect(firstNewTodoCard).toBeInTheDocument;
    expect(secondNewTodoCard).not.toBeInTheDocument;
  });

  it("searchTodo helpers returns todos based on user input", () => {
    const todos = [
      { id: 2, title: "third", text: "baz", complete: false },
      { id: 1, title: "second", text: "bar", complete: false },
      { id: 0, title: "first", text: "foo", complete: false }
    ];
    const expected = [
      { id: 0, title: "first", text: "foo", complete: false }
    ];
    const result = searchTodo(todos, "first");
    expect(result).toEqual(expected);
  });
});
