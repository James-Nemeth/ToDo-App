import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategory } from "../services/categoryService";
import { useState } from "react";

const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Required")
    .regex(/[a-zA-Z]/, "Must contain at least one letter"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const CategoryModal = ({
  onClose,
  onCategoryAdded,
}: {
  onClose: () => void;
  onCategoryAdded: (newCategory: { id: number; name: string }) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      const newCategory = await addCategory({ name: data.name });
      onCategoryAdded(newCategory);
      reset();
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Category</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Category Name"
            {...register("name")}
            className="p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 font-bold">{errors.name.message}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
