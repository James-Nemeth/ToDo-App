package io.nology.to_do_spring_app.category;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public List<Category> getAllCategories() {
        List<Category> categories = repo.findAll();
        if (categories.isEmpty()) {
            throw new IllegalStateException("No categories found.");
        }
        return categories;
    }

    public Category getCategoryById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category with ID " + id + " was not found."));

    }

    public Category createCategory(CreateCategoryDTO data) {
        boolean duplicatedCategory = repo.existsCategoryByName(data.getName());
        if (duplicatedCategory) {
            throw new IllegalArgumentException("Category '" + data.getName() + "' already exists.");
        }

        Category newCategory = new Category(data.getName());
        return repo.save(newCategory);
    }

    public Category updateCategory(Long id, CreateCategoryDTO data) {
        Category category = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category with ID " + id + " not found."));

        category.setName(data.getName());
        return repo.save(category);
    }

    public void deleteCategory(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Category with ID " + id + " does not exist.");
        }

        repo.deleteById(id);
    }
}
