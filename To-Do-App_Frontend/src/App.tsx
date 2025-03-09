import { CategoryProvider } from "./context/CategoryContext";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CategoryProvider>
      <TodoProvider>
        <div className="p-5">
          <Home />
        </div>
        <ToastContainer position="top-left" autoClose={3000} />
      </TodoProvider>
    </CategoryProvider>
  );
}

export default App;
