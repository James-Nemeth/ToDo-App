package io.nology.to_do_spring_app.todo;

import org.springframework.data.jpa.repository.JpaRepository;

import io.nology.to_do_spring_app.category.Category;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCategoryId(Long categoryId);

    List<Todo> findByIsArchivedFalse();

    boolean existsByTaskAndCategoryAndCompletedFalseAndIsArchivedFalse(String task, Category category);

}
