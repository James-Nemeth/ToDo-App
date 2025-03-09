import { Todo } from "../types/todo";
import { useTodo } from "../context/TodoContext";
import { toast } from "react-toastify";

const TodoItem = ({
  todo,
  onUpdate,
  isCompletedTab,
  onEdit,
}: {
  todo: Todo;
  onUpdate: () => void;
  isCompletedTab: boolean;
  onEdit: () => void;
}) => {
  const { archiveTodoItem, updateTodoStatus } = useTodo();

  const setIsArchive = async () => {
    try {
      await archiveTodoItem(todo.id);
      onUpdate();
    } catch (error) {
      toast.error("Error deleting the todo. Try again");
    }
  };

  const setIsComplete = async () => {
    try {
      await updateTodoStatus(todo.id, { completed: true });
      onUpdate();
    } catch (error) {
      toast.error("Error updating the todo. Try again");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center p-4 bg-[#1E1E2F] border border-gray-600 text-[#F8F8F8] rounded-lg shadow-md hover:shadow-lg transition-all my-3">
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-[#F5A623]">{todo.task}</h3>
        <p className="text-sm text-gray-300">{todo.category.name}</p>
      </div>
      <div className="flex gap-2 mt-3 sm:mt-0">
        {isCompletedTab ? (
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg flex items-center justify-center w-10 h-10">
              ✓
            </div>
            <button
              onClick={setIsArchive}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-md"
            >
              Delete
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-md"
            >
              Edit
            </button>
            <button
              onClick={setIsComplete}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-md"
            >
              Complete
            </button>
            <button
              onClick={setIsArchive}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-md"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
