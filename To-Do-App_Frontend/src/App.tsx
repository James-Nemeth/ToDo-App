import ThemeToggle from "./components/common/ThemeToggle";
import { CategoryProvider } from "./context/CategoryContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <TodoProvider>
          <div className="p-5 relative">
            <div className="absolute top-4 right-4 ">
              <ThemeToggle />
            </div>
            <Home />
          </div>
          <ToastContainer position="top-left" autoClose={3000} />
        </TodoProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default App;
