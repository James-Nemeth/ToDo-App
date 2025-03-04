import { useEffect, useState } from "react";
import { Category, Todo } from "../types/todo";
import { getTodos } from "../services/todoService";
import TodoItem from "./TodoItem";
import EditTodoModal from "./EditModal";

const TodoList = ({
  categories,
  fetchCategories,
}: {
  categories: Category[];
  fetchCategories: () => void;
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

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
    fetchCategories();
  }, [categories]);

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

      <div className="mb-4">
        <select
          className="px-4 py-2 border rounded-lg bg-[#1E1E2F] text-[#F8F8F8] shadow-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {todos
        .filter((todo) =>
          activeTab === "active" ? !todo.completed : todo.completed
        )
        .filter(
          (todo) =>
            selectedCategory === "all" ||
            todo.category.name === selectedCategory
        )
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={fetchTodos}
            isCompletedTab={activeTab === "completed"}
            onEdit={() => setEditingTodo(todo)}
          />
        ))}

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          categories={categories}
          onClose={() => setEditingTodo(null)}
          onUpdate={() => {
            fetchTodos();
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
};

export default TodoList;
