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
    <div className="flex justify-between items-center p-2 border rounded my-2">
      <span className={todo.isArchived ? "line-through text-gray-500" : ""}>
        {todo.task}
      </span>
      <div>
        <button
          onClick={makeIsArchive}
          className="bg-red-500 text-white p-1 mx-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
