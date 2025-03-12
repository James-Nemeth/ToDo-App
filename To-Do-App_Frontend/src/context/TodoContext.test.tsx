import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { TodoProvider, useTodo } from "./TodoContext";
import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  getTodos,
  addTodo,
  editTodo,
  updateTodo,
  archiveTodo,
} from "../services/todoService";
import React, { useEffect } from "react";

vi.mock("../services/todoService", () => ({
  getTodos: vi.fn(),
  addTodo: vi.fn(),
  editTodo: vi.fn(),
  updateTodo: vi.fn(),
  archiveTodo: vi.fn(),
}));

const TestComponent = () => {
  const {
    todos,
    addNewTodo,
    editExistingTodo,
    updateTodoStatus,
    archiveTodoItem,
    fetchTodos,
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
  } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div>
      <button
        onClick={() =>
          addNewTodo({ task: "New Todo", categoryId: 1, isArchived: false })
        }
      >
        Add Todo
      </button>
      <button
        onClick={() =>
          editExistingTodo(2, { task: "Edited Task", categoryId: 2 })
        }
      >
        Edit Todo
      </button>
      <button onClick={() => updateTodoStatus(1, { completed: true })}>
        Update Todo
      </button>
      <button onClick={() => archiveTodoItem(1)}>Archive Todo</button>
      <button onClick={() => setActiveTab("completed")}>Set Active Tab</button>
      <button onClick={() => setSelectedCategory("Work")}>
        Set Selected Category
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <div>Active Tab: {activeTab}</div>
      <div>Selected Category: {selectedCategory}</div>
    </div>
  );
};

describe("TodoContext", () => {
  const mockTodos = [
    {
      id: 1,
      task: "Buy milk",
      isArchived: false,
      completed: false,
      category: { id: 1, name: "Work" },
    },
    {
      id: 2,
      task: "Go for a walk",
      isArchived: false,
      completed: false,
      category: { id: 2, name: "Personal" },
    },
  ];

  beforeEach(() => {
    vi.mocked(getTodos).mockResolvedValue(mockTodos);
  });

  it("should fetch and display todos", async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("Buy milk")).toBeInTheDocument()
    );
  });

  it("should add a new todo", async () => {
    const newTodo = {
      id: 3,
      task: "New Todo",
      isArchived: false,
      completed: false,
      category: { id: 1, name: "Work" },
    };

    vi.mocked(addTodo).mockResolvedValue(newTodo);
    vi.mocked(getTodos).mockResolvedValue([...mockTodos, newTodo]);

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Add Todo"));

    await waitFor(() => {
      console.log("Current todos:", screen.getByText("New Todo"));
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
  });

  it("should edit an existing todo", async () => {
    const editedTodo = {
      id: 2,
      task: "Edited Task",
      isArchived: false,
      completed: false,
      category: { id: 2, name: "Personal" },
    };

    vi.mocked(editTodo).mockResolvedValue(editedTodo);
    vi.mocked(getTodos).mockResolvedValue([mockTodos[0], editedTodo]);

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Edit Todo"));

    await waitFor(() =>
      expect(screen.getByText("Edited Task")).toBeInTheDocument()
    );
  });

  it("should update todo status", async () => {
    const updatedTodo = {
      id: 1,
      task: "Buy milk",
      isArchived: false,
      completed: true,
      category: { id: 1, name: "Work" },
    };

    vi.mocked(updateTodo).mockResolvedValue(updatedTodo);
    vi.mocked(getTodos).mockResolvedValue([updatedTodo, mockTodos[1]]);

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Update Todo"));

    await waitFor(() =>
      expect(screen.getByText("Buy milk")).toBeInTheDocument()
    );
  });

  it("should archive a todo", async () => {
    vi.mocked(archiveTodo).mockResolvedValue();
    vi.mocked(getTodos).mockResolvedValue([mockTodos[1]]);

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Archive Todo"));

    await waitFor(() =>
      expect(screen.queryByText("Buy milk")).not.toBeInTheDocument()
    );
  });

  it("should set the active tab", () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Set Active Tab"));

    expect(screen.getByText("Active Tab: completed")).toBeInTheDocument();
  });

  it("should set the selected category", () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Set Selected Category"));

    expect(screen.getByText("Selected Category: Work")).toBeInTheDocument();
  });
});
