import { useState } from "react";
import { Category } from "../types/todo";
import CategoryModal from "./CategroyModal";

interface CategorySelectProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (id: number | null) => void;
  onCategoryAdded: (newCategory: Category) => void;
}

const CategorySelect = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onCategoryAdded,
}: CategorySelectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onClose={() => setIsModalOpen(false)}
          onCategoryAdded={(newCategory) => {
            onCategoryAdded(newCategory);
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default CategorySelect;
