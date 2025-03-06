import React, { createContext, useContext, useState } from "react";
import { Todo } from "../types/todo";
import {
  getTodos,
  addTodo,
  editTodo,
  updateTodo,
  archiveTodo,
} from "../services/todoService";

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
      console.error("Error fetching todos:", error);
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
      console.error("Error adding todo:", error);
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
      console.error("Error editing todo:", error);
    }
  };

  const updateTodoStatus = async (id: number, updatedTodo: Partial<Todo>) => {
    try {
      await updateTodo(id, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  const archiveTodoItem = async (id: number) => {
    try {
      await archiveTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error archiving todo:", error);
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
