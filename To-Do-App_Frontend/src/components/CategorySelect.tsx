import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import { useCategory } from "../context/CategoryContext";
import { Category } from "../types/todo";

interface CategorySelectProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (id: number | null) => void;
  onCategoryAdded?: (newCategory: Category) => void;
}

const CategorySelect = ({
  selectedCategory,
  onCategoryChange,
}: CategorySelectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <select
        value={selectedCategory ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "new") {
            setIsModalOpen(true);
          } else {
            onCategoryChange(Number(value));
          }
        }}
        className="p-2 border rounded"
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
        <option value="new" className="text-blue-500">
          Create New Category
        </option>
      </select>

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CategorySelect;
