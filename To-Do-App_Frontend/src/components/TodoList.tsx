import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import EditTodoModal from "./EditModal";
import { useTodo } from "../context/TodoContext";
import { useTheme } from "../context/ThemeContext";
import { useCategory } from "../context/CategoryContext";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const {
    activeTab,
    selectedCategory,
    fetchTodos,
    setActiveTab,
    setSelectedCategory,
  } = useTodo();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { theme } = useTheme();
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  return (
    <div className={`mt-5 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-bold transition-all shadow-md ${
            activeTab === "active"
              ? theme === "light"
                ? "bg-[#353a6e] text-white hover:bg-[#1e2d5f]"
                : "bg-[#F5A623] text-[#1E1E2F] hover:bg-[#E5941C]"
              : theme === "light"
              ? "bg-gray-600 text-black hover:bg-gray-500"
              : "bg-gray-600 text-[#F8F8F8] hover:bg-gray-500"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Tasks
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-bold transition-all shadow-md ${
            activeTab === "completed"
              ? theme === "light"
                ? "bg-[#353a6e] text-white hover:bg-[#1e2d5f]"
                : "bg-[#F5A623] text-[#1E1E2F] hover:bg-[#E5941C]"
              : theme === "light"
              ? "bg-gray-600 text-black hover:bg-gray-500"
              : "bg-gray-600 text-[#F8F8F8] hover:bg-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Tasks
        </button>
      </div>

      <div className="mb-4">
        <select
          className={`px-4 py-2 border rounded-lg shadow-md ${
            theme === "light"
              ? "bg-white text-black border-gray"
              : "bg-[#1E1E2F] text-[#F8F8F8] border-[#F8F8F8]"
          }`}
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
          isOpen={!!editingTodo}
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
