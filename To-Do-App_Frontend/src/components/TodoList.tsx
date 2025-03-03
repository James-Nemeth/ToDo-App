import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { getTodos } from "../services/todoService";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-bold transition-all shadow-md ${
            activeTab === "active"
              ? "bg-[#F5A623] text-[#1E1E2F] hover:bg-[#E5941C]"
              : "bg-gray-600 text-[#F8F8F8] hover:bg-gray-500"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Tasks
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-bold transition-all shadow-md ${
            activeTab === "completed"
              ? "bg-[#F5A623] text-[#1E1E2F] hover:bg-[#E5941C]"
              : "bg-gray-600 text-[#F8F8F8] hover:bg-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Tasks
        </button>
      </div>

      {todos
        .filter((todo) =>
          activeTab === "active" ? !todo.completed : todo.completed
        )
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={fetchTodos}
            isCompletedTab={activeTab === "completed"}
          />
        ))}
    </div>
  );
};

export default TodoList;
