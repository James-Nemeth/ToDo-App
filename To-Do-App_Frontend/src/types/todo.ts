export interface Category {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  task: string;
  category: Category;
  isArchived: boolean;
  completed: boolean;
}
