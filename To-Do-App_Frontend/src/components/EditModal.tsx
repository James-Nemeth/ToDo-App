import { useState } from "react";
import { editTodo } from "../services/todoService";
import { Category, Todo } from "../types/todo";

interface EditTodoModalProps {
  todo: Todo;
  categories: Category[];
  onClose: () => void;
  onUpdate: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  categories,
  onClose,
  onUpdate,
}) => {
  const [task, setTask] = useState(todo.task);
  const [categoryId, setCategoryId] = useState(todo.category.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editTodo(todo.id, { task, categoryId });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col">
            <span className="font-semibold">Task:</span>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              className="p-2 border rounded"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold">Category:</span>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="p-2 border rounded bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
