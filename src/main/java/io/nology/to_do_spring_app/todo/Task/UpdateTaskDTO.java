package io.nology.to_do_spring_app.todo.Task;

public class UpdateTaskDTO {
    private String task;
    private Boolean completed;

    public String getTask() {
        return task;
    }

    public Boolean getCompleted() {
        return completed;
    }
}
