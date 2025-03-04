import axios from "axios";
import { Todo } from "../types/todo";

const API_URL = "http://localhost:8080";

export const getTodos = async () => {
  const response = await axios.get<Todo[]>(`${API_URL}/todos`);
  return response.data.filter((todo) => !todo.isArchived);
};

export const addTodo = async (todo: {
  task: string;
  categoryId: number;
  isArchived: boolean;
}) => {
  const response = await axios.post<Todo>(`${API_URL}/todos`, todo);
  return response.data;
};

export const updateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
  const response = await axios.patch<Todo>(
    `${API_URL}/todos/${id}`,
    updatedTodo
  );
  return response.data;
};

export const archiveTodo = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
