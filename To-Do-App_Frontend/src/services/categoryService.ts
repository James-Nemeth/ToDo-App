import axios from "axios";
import { Category } from "../types/todo";

const API_URL = "http://3.26.14.209";

export const getCategories = async () => {
  const response = await axios.get<Category[]>(`${API_URL}/categories`);
  return response.data;
};

export const addCategory = async (category: Omit<Category, "id">) => {
  const response = await axios.post<Category>(
    `${API_URL}/categories`,
    category
  );
  return response.data;
};
