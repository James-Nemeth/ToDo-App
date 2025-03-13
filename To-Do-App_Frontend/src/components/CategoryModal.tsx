import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Modal from "./common/Modal";
import { toast } from "react-toastify";
import { useCategory } from "../context/CategoryContext";

const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Required")
    .regex(/[a-zA-Z]/, "Must contain at least one letter"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const CategoryModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { addNewCategory, fetchCategories } = useCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      await addNewCategory(data.name);
      toast.success("New Category Added.");
      fetchCategories();
      onClose();
    } catch (error) {
      toast.error("Failed to add category. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            onClick={handleSubmit(onSubmit)}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;
