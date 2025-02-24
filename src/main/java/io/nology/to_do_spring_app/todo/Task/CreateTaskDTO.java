package io.nology.to_do_spring_app.todo.Task;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {

    @NotBlank
    private String task;

    private Boolean completed = false;

    public String getTask() {
        return task;
    }

    public Boolean getCompleted() {
        return completed != null ? completed : false;
    }

    @Override
    public String toString() {
        return "CreateTaskDTO [task=" + task + ", completed=" + completed + "]";
    }

}
