import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-[#1E1E2F] border border-gray-600 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-[#F5A623]">
        To-Do List
      </h1>

      <div className="mt-5">
        <TodoForm onAdd={() => window.location.reload()} />
      </div>

      <div className="mt-5">
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
