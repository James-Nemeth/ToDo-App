import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "../types/todo";
import { getCategories } from "../services/categoryService";
import CategorySelect from "./CategorySelect";
import { toast } from "react-toastify";

const todoSchema = z.object({
  task: z.string().min(3, "Task must be at least 3 characters long."),
  categoryId: z
    .number()
    .nullable()
    .refine((val) => val !== null, {
      message: "Category is required.",
    }),
});

type TodoFormValues = z.infer<typeof todoSchema>;

interface TodoFormProps {
  buttonText: string;
  onSubmit: (data: {
    task: string;
    categoryId: number;
    isArchived: boolean;
  }) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ buttonText, onSubmit }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const onSubmitForm = async (data: TodoFormValues) => {
    try {
      const todoData = {
        task: data.task,
        categoryId: data.categoryId,
        isArchived: false,
      };
      onSubmit(todoData);
      toast.success("New Task has been successfully added.");
      reset();
    } catch (error) {
      toast.error("Failed to add the todo. Try again");
    }
  };

  const handleCategoryChange = (id: number | null) => {
    if (id !== null) {
      setValue("categoryId", id);
      clearErrors("categoryId");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Add a new Task"
        {...register("task")}
        className="p-2 border rounded"
      />
      {errors.task && (
        <p className="text-red-500 font-bold">{errors.task.message}</p>
      )}

      <CategorySelect
        categories={categories}
        selectedCategory={watch("categoryId")}
        onCategoryChange={handleCategoryChange}
        onCategoryAdded={(newCategory: Category) =>
          setCategories([...categories, newCategory])
        }
      />
      {errors.categoryId && (
        <p className="text-red-500 font-bold">{errors.categoryId.message}</p>
      )}

      <button
        type="submit"
        className={`bg-blue-500 p-2 rounded font-bold text-xl hover:bg-blue-600 text-white`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default TodoForm;
