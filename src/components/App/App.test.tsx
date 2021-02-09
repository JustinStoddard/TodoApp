import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("Test if a user can create a todo", () => {
  render(<App />);
  const createTodoButton = screen.findByTestId("create-todo-button");
  console.log("Hey", createTodoButton);
  // createTodoButton.
});
