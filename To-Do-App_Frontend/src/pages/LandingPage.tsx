import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleGetStarted = () => {
    navigate("/question-one");
  };

  return (
    <div className="landing-page flex flex-col items-center justify-center min-h-screen p-5">
      <h1
        className={`text-5xl font-bold mb-8 ${
          theme === "dark" ? "text-light" : "text-dark"
        } text-center`}
      >
        Welcome to TaskFlow
      </h1>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600"
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
