import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useCategory } from "../context/CategoryContext";
import { useTodo } from "../context/TodoContext";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { categories, fetchCategories } = useCategory();
  const { todos, addNewTodo, fetchTodos } = useTodo();
  const { theme } = useTheme();

  const handleAddTodo = (data: {
    task: string;
    categoryId: number;
    isArchived: boolean;
  }) => {
    addNewTodo(data);
    fetchTodos();
  };

  return (
    <div
      className={`max-w-5xl mx-auto mt-16 p-6 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-dark" : "bg-light"
      } border border-gray-600 rounded-lg shadow-lg`}
    >
      <h1
        className={`text-4xl font-bold text-center ${
          theme === "dark" ? "text-light" : "text-dark"
        }`}
      >
        TaskFlow
      </h1>

      <div className="mt-5">
        <TodoForm buttonText="Add Task" onSubmit={handleAddTodo} />
      </div>

      <div className="mt-5">
        <TodoList
          categories={categories}
          fetchCategories={fetchCategories}
          todos={todos}
        />
      </div>
    </div>
  );
};

export default Home;
