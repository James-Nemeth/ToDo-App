package io.nology.to_do_spring_app.todo;

import io.nology.to_do_spring_app.category.Category;
import io.nology.to_do_spring_app.category.CategoryRepository;

import java.util.Optional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class TodoService {

    private final TodoRepository repo;
    private final CategoryRepository categoryRepo;

    public TodoService(TodoRepository repo, CategoryRepository categoryRepo) {
        this.repo = repo;
        this.categoryRepo = categoryRepo;
    }

    public List<Todo> getAllTodos() {
        List<Todo> todos = repo.findByIsArchivedFalse();

        return todos;
    }

    public List<Todo> getTodosByCategory(Long categoryId) {
        List<Todo> todos = repo.findByCategoryId(categoryId);

        if (todos.isEmpty()) {
            throw new IllegalArgumentException("No todos found with that categoryId.");
        }

        return todos;
    }

    public Todo getTodoById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Todo createTodo(CreateTodoDTO data) {
        Category category = categoryRepo.findById(data.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        boolean duplicatedTodo = repo.existsByTaskAndCategoryAndCompletedFalseAndIsArchivedFalse(data.getTask(),
                category);
        if (duplicatedTodo) {
            throw new IllegalArgumentException("A task with that name and category already exists");
        }
        Todo newTodo = new Todo(data.getTask(), data.getCompleted(), category);
        return repo.save(newTodo);
    }

    public Todo updateTodo(Long id, UpdateTodoDTO data) {
        Optional<Todo> optionalTodo = repo.findById(id);
        if (optionalTodo.isEmpty()) {
            throw new IllegalArgumentException("Todo not found");
        }

        Todo todo = optionalTodo.get();

        Category category = categoryRepo.findById(data.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        todo.setTask(data.getTask());
        todo.setCompleted(data.getIsCompleted());
        todo.setCategory(category);

        return repo.save(todo);
    }

    public Todo updatePartialTodo(Long id, Map<String, Object> updates) {
        Optional<Todo> optionalTodo = repo.findById(id);
        if (optionalTodo.isEmpty()) {
            throw new IllegalArgumentException("Todo not found");
        }

        Todo todo = optionalTodo.get();

        updates.forEach((key, value) -> {
            switch (key) {
                case "task":
                    todo.setTask((String) value);
                    break;
                case "completed":
                    todo.setCompleted((Boolean) value);
                    break;
                case "isArchived":
                    todo.setIsArchived((Boolean) value);
                    break;
                case "category":

                    if (value instanceof Map) {
                        @SuppressWarnings("unchecked")
                        Map<String, Object> categoryData = (Map<String, Object>) value;
                        Long categoryId = ((Number) categoryData.get("id")).longValue();
                        Optional<Category> category = categoryRepo.findById(categoryId);
                        category.ifPresent(todo::setCategory);
                    }
                    break;
            }
        });

        return repo.save(todo);
    }

    public Todo archiveTodo(Long id) {
        Optional<Todo> optionalTodo = repo.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();

            if (todo.getIsArchived()) {
                throw new IllegalStateException("Can't modify tasks that have been archived");
            }

            todo.setIsArchived(true);
            return repo.save(todo);
        }
        return null;
    }

}
