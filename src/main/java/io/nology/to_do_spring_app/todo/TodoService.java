package io.nology.to_do_spring_app.todo;

import io.nology.to_do_spring_app.category.Category;
import io.nology.to_do_spring_app.category.CategoryRepository;

import java.util.Optional;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repo;
    private final CategoryRepository categoryRepo;

    public TodoService(TodoRepository repo, CategoryRepository categoryRepo) {
        this.repo = repo;
        this.categoryRepo = categoryRepo;
    }

    public List<Todo> getAllTodos() {
        return repo.findAll();
    }

    public List<Todo> getTodosByCategory(Long categoryId) {
        return repo.findByCategoryId(categoryId);
    }

    public Todo createTodo(CreateTodoDTO data) {
        Category category = categoryRepo.findById(data.getCategoryId()).orElse(null);
        if (category == null) {
            return null;
        }
        Todo newTodo = new Todo(data.getTask(), data.getCompleted(), category);
        return repo.save(newTodo);
    }

    public Todo updateTodo(Long id, CreateTodoDTO data) {
        Optional<Todo> optionalTodo = repo.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setTask(data.getTask());
            todo.setCompleted(data.getCompleted());
            return repo.save(todo);
        }
        return null;
    }

    public Todo archiveTodo(Long id) {
        Optional<Todo> optionalTodo = repo.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setIsArchived(true);
            return repo.save(todo);
        }
        return null;
    }

}
