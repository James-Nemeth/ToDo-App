import { useState } from "react";

interface CategoryModalProps {
  onClose: () => void;
  onCategoryCreated: (newCategory: { id: number; name: string }) => void;
}

const CategoryModal = ({ onClose, onCategoryCreated }: CategoryModalProps) => {
  const [newCategory, setNewCategory] = useState("");

  const handleNewCategorySubmit = async () => {
    if (!newCategory.trim()) return;

    const response = await fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategory }),
    });

    const createdCategory = await response.json();
    onCategoryCreated(createdCategory);
    setNewCategory("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Create New Category</h2>
        <input
          type="text"
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleNewCategorySubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
