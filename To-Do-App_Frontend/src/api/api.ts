import axios from "axios";
import { Todo, Category } from "../types/todo";

const API_URL = "http://localhost:8080";

export const getTodos = async () => {
  const response = await axios.get<Todo[]>(`${API_URL}/todos`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get<Category[]>(`${API_URL}/categories`);
  return response.data;
};

export const addTodo = async (todo: Omit<Todo, "id">) => {
  const response = await axios.post<Todo>(`${API_URL}/todos`, todo);
  return response.data;
};

export const updateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
  const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`);
};
