import { CategoryProvider } from "./context/CategoryContext";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";

function App() {
  return (
    <CategoryProvider>
      <TodoProvider>
        <div className="p-5">
          <Home />
        </div>
      </TodoProvider>
    </CategoryProvider>
  );
}

export default App;
