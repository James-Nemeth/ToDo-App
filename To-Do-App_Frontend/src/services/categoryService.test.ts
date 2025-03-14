import { describe, it, expect, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getCategories, addCategory } from "../services/categoryService";
import { Category } from "../types/todo";

const mock = new MockAdapter(axios);

describe("categoryService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch categories", async () => {
    const mockCategories: Category[] = [
      { id: 1, name: "Work" },
      { id: 2, name: "Personal" },
    ];
    mock.onGet("http://13.236.184.230/categories").reply(200, mockCategories);

    const categories = await getCategories();

    expect(categories).toEqual(mockCategories);
  });

  it("should add a category", async () => {
    const newCategory: Omit<Category, "id"> = { name: "Health" };
    const mockCategory: Category = { ...newCategory, id: 3 };
    mock
      .onPost("http://13.236.184.230/categories", newCategory)
      .reply(201, mockCategory);

    const category = await addCategory(newCategory);

    expect(category).toEqual(mockCategory);
  });
});
