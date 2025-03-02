import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const categorySchema = z.object({
  name: z.string().min(1, "Required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const CategoryModal = ({
  onClose,
  onAddCategory,
}: {
  onClose: () => void;
  onAddCategory: (name: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const [confirm, setConfirm] = useState(false);
  const categoryName = watch("name", "");

  const onSubmit = async (data: CategoryFormValues) => {
    setConfirm(true);
  };

  const handleConfirmCreate = () => {
    onAddCategory(categoryName);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        {confirm ? (
          <>
            <h2 className="text-xl font-bold mb-4">Confirm Category</h2>
            <p className="mb-4">
              Are you sure you want to add "
              <span className="font-bold">{categoryName}</span>"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmCreate}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Create
              </button>
            </div>
          </>
        ) : (
          <>
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
                >
                  Add Category
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
