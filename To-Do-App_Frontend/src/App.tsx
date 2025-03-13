import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuestionOne from "./pages/QuestionOne";
import QuestionTwo from "./pages/QuestionTwo";

import ThemeToggle from "./components/common/ThemeToggle";
import { CategoryProvider } from "./context/CategoryContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <TodoProvider>
          <div className="absolute top-4 right-5 z-100">
            <ThemeToggle />
          </div>
          <Router basename="/ToDo-App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/question-one" element={<QuestionOne />} />
              <Route path="/question-two" element={<QuestionTwo />} />
              <Route path="/home" element={<Home />} />
              <Route path="/*" element={<LandingPage />} />
            </Routes>
          </Router>
          <ToastContainer position="top-left" autoClose={3000} />
        </TodoProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
};

export default App;
