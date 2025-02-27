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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Add a new Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-2 border rounded"
      />
      <select
        value={categoryId ?? ""}
        onChange={(e) => setCategroyId(Number(e.target.value))}
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
      <button type="submit" className="bg-blue-500 tyext-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
