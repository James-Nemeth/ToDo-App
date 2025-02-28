import { useEffect, useState } from "react";
import { Category } from "../types/todo";
import { getCategories } from "../api/api";

const TodoForm = ({ onAdd }: { onAdd: () => void }) => {
  const [task, setTask] = useState("");
  const [categoryId, setCategroyId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || categoryId === null) return;

    await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task,
        categoryId,
        isArchived: false,
      }),
    });

    setTask("");
    setCategroyId(null);
    onAdd();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-[#1E1E2F] p-6 border border-gray-600 rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Add a new Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-3 bg-[#F8F8F8] text-black border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
      />

      <select
        value={categoryId ?? ""}
        onChange={(e) => setCategroyId(Number(e.target.value))}
        className="p-3 bg-[#F8F8F8] text-black border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-[#F5A623] text-[#1E1E2F] font-bold p-3 rounded-lg shadow-md hover:bg-[#E5941C] transition-all"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
