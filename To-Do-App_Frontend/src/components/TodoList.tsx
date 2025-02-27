import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos");
      const data = await response.json();

      setTodos(data.filter((todo: Todo) => !todo.isArchived));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="mt-5">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
      ))}
    </div>
  );
};

export default TodoList;
