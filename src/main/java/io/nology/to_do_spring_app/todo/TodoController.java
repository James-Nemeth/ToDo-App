package io.nology.to_do_spring_app.todo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.nology.to_do_spring_app.common.ErrorResponse;

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
    public ResponseEntity<Object> getTodoById(@PathVariable Long id) {
        try {
            Todo todo = service.getTodoById(id);
            return ResponseEntity.ok(todo);
        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), "Error fetching todo by ID");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping
    public ResponseEntity<Object> createTodo(@RequestBody CreateTodoDTO data) {
        try {
            Todo createdTodo = service.createTodo(data);
            return ResponseEntity.ok(createdTodo);
        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), "Error creating todo");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTodo(@PathVariable Long id, @RequestBody UpdateTodoDTO data) {
        try {
            Todo updatedTodo = service.updateTodo(id, data);
            return ResponseEntity.ok(updatedTodo);
        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), "Error creating todo");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Todo> updatePartialTodo(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Todo updatedTodo = service.updatePartialTodo(id, updates);
        return (updatedTodo != null) ? ResponseEntity.ok(updatedTodo) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Todo> archiveTodo(@PathVariable Long id) {
        Todo archivedTodo = service.archiveTodo(id);
        return (archivedTodo != null) ? ResponseEntity.ok(archivedTodo) : ResponseEntity.notFound().build();
    }

}
