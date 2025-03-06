import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { Category, Todo } from "../types/todo";
import Modal from "../components/common/Modal";

interface EditTodoModalProps {
  isOpen: boolean;
  todo: Todo;
  categories: Category[];
  onClose: () => void;
  onUpdate: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  todo,
  categories,
  onClose,
  onUpdate,
}) => {
  const { editExistingTodo } = useTodo();
  const [task, setTask] = useState(todo.task);
  const [categoryId, setCategoryId] = useState(todo.category.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedTodo = {
        task,
        categoryId,
      };
      await editExistingTodo(todo.id, updatedTodo);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-20"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditTodoModal;
