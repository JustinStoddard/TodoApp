interface Todo {
  id: number,
  title: string,
  text: string,
  complete: boolean
};

type Todos = Todo;

export const addTodo = (list: Todos[], item: Todo) => [item, ...list];

export const deleteTodo = (list: Todos[], id: number) => {
  return list.filter((todo) => {
    if (id !== todo.id) {
      return todo;
    }
    return null;
  })
};

export const completeTodo = (list: Todos[], id: number, value: boolean) => {
  let todos = JSON.parse(JSON.stringify(list));
  todos.map((todo: Todo) => {
    if (id === todo.id) {
      todo.complete = value;
    }
  });
  return todos;
};

export const searchTodo = (list: Todos[], value: string) => {
  return list.filter((todo: Todo) => {
    const title = todo.title.toLowerCase();
    if (title.indexOf(value) !== -1) {
      return todo;
    }
    return null;
  });
};