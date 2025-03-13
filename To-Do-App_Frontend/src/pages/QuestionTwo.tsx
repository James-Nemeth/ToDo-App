import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { useTheme } from "../context/ThemeContext";
import { useTodo } from "../context/TodoContext";

const QuestionTwo: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { addNewTodo } = useTodo();

  const handleNext = (data: {
    task: string;
    categoryId: number;
    isArchived: boolean;
  }) => {
    addNewTodo(data);
    navigate("/home");
  };

  return (
    <div className="questionnaire-page flex flex-col items-center justify-center min-h-screen p-5">
      <h2
        className={`text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-light" : "text-dark"
        } text-center`}
      >
        What is a task that you would like to achieve today?
      </h2>
      <div className="w-full max-w-md">
        <TodoForm buttonText="Next" onSubmit={handleNext} />
      </div>
    </div>
  );
};

export default QuestionTwo;
