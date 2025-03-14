import { describe, it, expect, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getTodos,
  addTodo,
  editTodo,
  updateTodo,
  archiveTodo,
} from "../services/todoService";
import { Todo, Category } from "../types/todo";

const mock = new MockAdapter(axios);

describe("todoService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch todos", async () => {
    const mockCategories: Category[] = [
      { id: 1, name: "Work" },
      { id: 2, name: "Personal" },
    ];
    const mockTodos: Todo[] = [
      {
        id: 1,
        task: "Buy milk",
        category: mockCategories[0],
        isArchived: false,
        completed: false,
      },
      {
        id: 2,
        task: "Go for a walk",
        category: mockCategories[1],
        isArchived: false,
        completed: false,
      },
    ];
    mock.onGet("http://3.26.14.209/todos").reply(200, mockTodos);

    const todos = await getTodos();

    expect(todos).toEqual(mockTodos.filter((todo) => !todo.isArchived));
  });

  it("should add a todo", async () => {
    const mockCategoryId = 1;
    const newTodo = {
      task: "Complete assignment",
      categoryId: mockCategoryId,
      isArchived: false,
      completed: false,
    };
    const mockTodo: Todo = {
      ...newTodo,
      id: 3,
      category: { id: mockCategoryId, name: "Work" },
    };
    mock.onPost("http://3.26.14.209/todos", newTodo).reply(201, mockTodo);

    const todo = await addTodo(newTodo);

    expect(todo).toEqual(mockTodo);
  });

  it("should edit a todo", async () => {
    const mockCategoryId = 1;
    const updatedTodo = {
      task: "Complete homework",
      categoryId: mockCategoryId,
      isArchived: false,
      completed: false,
    };
    const mockTodo: Todo = {
      id: 1,
      ...updatedTodo,
      category: { id: mockCategoryId, name: "Work" },
    };
    mock.onPut("http://3.26.14.209/todos/1", updatedTodo).reply(200, mockTodo);

    const todo = await editTodo(1, updatedTodo);

    expect(todo).toEqual(mockTodo);
  });

  it("should update a todo", async () => {
    const mockCategory: Category = { id: 1, name: "Work" };
    const updatedTodo = {
      task: "Complete assignment",
      category: mockCategory,
      isArchived: false,
      completed: false,
    };
    const mockTodo: Todo = { id: 1, ...updatedTodo };
    mock
      .onPatch("http://3.26.14.209/todos/1", updatedTodo)
      .reply(200, mockTodo);

    const todo = await updateTodo(1, updatedTodo);

    expect(todo).toEqual(mockTodo);
  });

  it("should archive a todo", async () => {
    mock.onDelete("http://3.26.14.209/todos/1").reply(200);

    await expect(archiveTodo(1)).resolves.not.toThrow();
  });
});
