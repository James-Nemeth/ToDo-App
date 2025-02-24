package io.nology.to_do_spring_app.todo;

import jakarta.persistence.*;

import io.nology.to_do_spring_app.category.Category;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String task;

    @Column
    private Boolean completed;

    @Column
    private Boolean isArchived = false;

    @ManyToOne

    private Category category;

    public Todo() {
    }

    public Todo(String task, Boolean completed, Category category) {
        this.task = task;
        this.completed = completed;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getTask() {
        return task;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public Boolean getIsArchived() {
        return isArchived;
    }

    public Category getCategory() {
        return category;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public void setIsArchived(Boolean isArchived) {
        this.isArchived = isArchived;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
