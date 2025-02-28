import { Todo } from "../types/todo";

const TodoItem = ({ todo, onUpdate }: { todo: Todo; onUpdate: () => void }) => {
  const makeIsArchive = async () => {
    try {
      await fetch(`http://localhost:8080/todos/${todo.id}`, {
        method: "DELETE",
      });

      onUpdate();
    } catch (error) {
      console.error("Error archiving todo:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-[#1E1E2F] border border-gray-600 text-[#F8F8F8] rounded-lg shadow-md hover:shadow-lg transition-all my-3">
      <div>
        <h3 className="text-lg font-semibold text-[#F5A623]">{todo.task}</h3>
        <p className="text-sm text-gray-300">{todo.category.name}</p>
      </div>

      <button
        onClick={makeIsArchive}
        className="bg-[#F5A623] hover:bg-[#E5941C] text-[#1E1E2F] font-bold px-4 py-2 rounded-lg transition-all shadow-md"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
