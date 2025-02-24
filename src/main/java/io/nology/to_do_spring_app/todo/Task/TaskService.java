package io.nology.to_do_spring_app.todo.Task;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public Task createTask(CreateTaskDTO data) {
        Task newTask = new Task();

        newTask.setTask(data.getTask().trim());
        newTask.setCompleted(data.getCompleted());

        return this.repo.save(newTask);
    }

    public List<Task> getAllTasks() {
        return this.repo.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return this.repo.findById(id);
    }

    public Optional<Task> updateTask(Long id, CreateTaskDTO data) {
        return this.repo.findById(id).map(existingTask -> {
            if (data.getTask() != null) {
                existingTask.setTask(data.getTask().trim());
            }
            if (data.getCompleted() != null) {
                existingTask.setCompleted(data.getCompleted());
            }
            return this.repo.save(existingTask);
        });
    }

    public boolean deleteTask(Long id) {
        if (this.repo.existsById(id)) {
            this.repo.deleteById(id);
            return true;
        }
        return false;
    }
}
