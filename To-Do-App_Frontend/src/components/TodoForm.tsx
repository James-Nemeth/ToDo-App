import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "../types/todo";
import { getCategories } from "../services/categoryService";
import CategorySelect from "./CategorySelect";

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
    await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: data.task,
        categoryId: data.categoryId,
        isArchived: false,
      }),
    });

    reset();
    onAdd();
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
        onCategoryAdded={(newCategory) =>
          setCategories([...categories, newCategory])
        }
      />
      {errors.categoryId && (
        <p className="text-red-500 font-bold">{errors.categoryId.message}</p>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
