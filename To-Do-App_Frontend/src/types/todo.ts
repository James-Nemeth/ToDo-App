export interface Category {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  title: string;
  category: Category;
  isArchived: boolean;
}
