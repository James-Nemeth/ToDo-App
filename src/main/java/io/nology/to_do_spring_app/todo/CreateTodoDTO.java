package io.nology.to_do_spring_app.todo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTodoDTO {

    @NotBlank
    private String task;

    @NotNull
    private Boolean completed;

    @NotNull
    private Long categoryId;

    public String getTask() {
        return task;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    @Override
    public String toString() {
        return "CreateTodoDTO [task=" + task + ", completed=" + completed + ", categoryId=" + categoryId + "]";
    }

}
