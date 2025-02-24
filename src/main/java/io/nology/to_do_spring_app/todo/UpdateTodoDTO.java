package io.nology.to_do_spring_app.todo;

public class UpdateTodoDTO {

    private String task;
    private Boolean isCompleted;
    private Long categoryId;

    public UpdateTodoDTO() {
    }

    public UpdateTodoDTO(String task, Boolean isCompleted, Long categoryId) {
        this.task = task;
        this.isCompleted = isCompleted;
        this.categoryId = categoryId;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
