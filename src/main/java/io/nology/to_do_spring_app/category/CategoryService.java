package io.nology.to_do_spring_app.category;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public List<Category> getAllCategories() {
        return repo.findAll();
    }

    public Category getCategoryById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Category createCategory(CreateCategoryDTO data) {
        Category newCategory = new Category(data.getName());
        return repo.save(newCategory);
    }

    public Category updateCategory(Long id, CreateCategoryDTO data) {
        Optional<Category> optionalCategory = repo.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setName(data.getName());
            return repo.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        repo.deleteById(id);
    }
}
