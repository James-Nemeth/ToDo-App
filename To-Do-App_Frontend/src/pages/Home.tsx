import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center">To-Do List</h1>
      <TodoForm onAdd={() => window.location.reload()} />
      <TodoList />
    </div>
  );
};

export default Home;
