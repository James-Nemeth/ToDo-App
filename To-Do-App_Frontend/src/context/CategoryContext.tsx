import React, { createContext, useContext, useState, useEffect } from "react";
import { Category } from "../types/todo";
import { getCategories, addCategory } from "../services/categoryService";
import { toast } from "react-toastify";

interface CategoryContextType {
  categories: Category[];
  fetchCategories: () => void;
  addNewCategory: (name: string) => Promise<Category>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    if (categories.length === 0) {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to get categories. Try again later");
      }
    }
  };

  const addNewCategory = async (name: string) => {
    try {
      const newCategory = await addCategory({ name });
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      return newCategory;
    } catch (error) {
      toast.error("Failed to add the category. Try again");
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, addNewCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
