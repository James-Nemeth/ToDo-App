package io.nology.to_do_spring_app.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(@RequestParam(required = false) Long category) {
        List<Todo> todos;
        if (category != null) {
            todos = service.getTodosByCategory(category);
        } else {
            todos = service.getAllTodos();
        }
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody CreateTodoDTO data) {
        return ResponseEntity.ok(service.createTodo(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody CreateTodoDTO data) {
        Todo updatedTodo = service.updateTodo(id, data);
        return updatedTodo != null ? ResponseEntity.ok(updatedTodo) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Todo> archiveTodo(@PathVariable Long id) {
        Todo archivedTodo = service.archiveTodo(id);
        return archivedTodo != null ? ResponseEntity.ok(archivedTodo) : ResponseEntity.notFound().build();
    }

}
