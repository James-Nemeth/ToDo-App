package io.nology.to_do_spring_app.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(@RequestParam(required = false) Long category) {
        List<Todo> todos = (category != null) ? service.getTodosByCategory(category) : service.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Todo todo = service.getTodoById(id);
        return todo != null ? ResponseEntity.ok(todo) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody CreateTodoDTO data) {
        try {
            Todo createdTodo = service.createTodo(data);
            return ResponseEntity.ok(createdTodo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePartialTodo(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Todo updatedTodo = service.updatePartialTodo(id, updates);
        return (updatedTodo != null) ? ResponseEntity.ok(updatedTodo) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> archiveTodo(@PathVariable Long id) {
        Todo archivedTodo = service.archiveTodo(id);
        return (archivedTodo != null) ? ResponseEntity.ok(archivedTodo) : ResponseEntity.notFound().build();
    }

}
