import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { getCategories } from "../services/categoryService";

const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.map((category) => category.name));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-[#1E1E2F] border border-gray-600 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-[#F5A623]">
        To-Do List
      </h1>

      <div className="mt-5">
        <TodoForm onAdd={fetchCategories} />
      </div>

      <div className="mt-5">
        <TodoList categories={categories} fetchCategories={fetchCategories} />
      </div>
    </div>
  );
};

export default Home;
