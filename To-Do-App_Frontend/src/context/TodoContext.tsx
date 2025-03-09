import React, { createContext, useContext, useState } from "react";
import { Todo } from "../types/todo";
import {
  getTodos,
  addTodo,
  editTodo,
  updateTodo,
  archiveTodo,
} from "../services/todoService";
import { toast } from "react-toastify";

interface TodoContextType {
  todos: Todo[];
  activeTab: "active" | "completed";
  selectedCategory: string;
  fetchTodos: () => void;
  addNewTodo: (todo: {
    task: string;
    categoryId: number;
    isArchived: boolean;
  }) => void;
  editExistingTodo: (
    id: number,
    updatedTodo: { task: string; categoryId: number }
  ) => void;
  updateTodoStatus: (id: number, updatedTodo: Partial<Todo>) => void;
  archiveTodoItem: (id: number) => void;
  setActiveTab: (tab: "active" | "completed") => void;
  setSelectedCategory: (category: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      toast.error("Failed to get todos. Try again later");
    }
  };

  const addNewTodo = async (todo: {
    task: string;
    categoryId: number;
    isArchived: boolean;
  }) => {
    try {
      await addTodo(todo);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to add todo. Try again");
    }
  };

  const editExistingTodo = async (
    id: number,
    updatedTodo: { task: string; categoryId: number }
  ) => {
    try {
      await editTodo(id, updatedTodo);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to edit todo. Try again");
    }
  };

  const updateTodoStatus = async (id: number, updatedTodo: Partial<Todo>) => {
    try {
      await updateTodo(id, updatedTodo);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to edit todo. Try again");
    }
  };

  const archiveTodoItem = async (id: number) => {
    try {
      await archiveTodo(id);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to delete todo. Try again");
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        activeTab,
        selectedCategory,
        fetchTodos,
        addNewTodo,
        editExistingTodo,
        updateTodoStatus,
        archiveTodoItem,
        setActiveTab,
        setSelectedCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
