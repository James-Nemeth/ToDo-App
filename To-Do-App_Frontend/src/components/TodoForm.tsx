import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "../types/todo";
import { getCategories } from "../services/categoryService";
import CategorySelect from "./CategorySelect";
import { addTodo } from "../services/todoService";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

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

const TodoForm = ({ onAdd }: { onAdd: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const onSubmit = async (data: TodoFormValues) => {
    try {
      await addTodo({
        task: data.task,
        categoryId: data.categoryId,
        isArchived: false,
      });

      reset();
      onAdd();
    } catch (error) {
      toast.error("Failed to add the todo. Try again");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
        onCategoryChange={(id) => {
          if (id !== null) {
            setValue("categoryId", id);
          }
        }}
        onCategoryAdded={(newCategory: Category) =>
          setCategories([...categories, newCategory])
        }
      />
      {errors.categoryId && (
        <p className="text-red-500 font-bold">{errors.categoryId.message}</p>
      )}

      <button
        type="submit"
        className={`${
          theme === "light" ? "text-black" : "text-white"
        } bg-blue-500 p-2 rounded font-bold text-xl hover:bg-blue-600`}
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
