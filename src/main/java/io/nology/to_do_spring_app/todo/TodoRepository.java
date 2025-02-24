package io.nology.to_do_spring_app.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCategoryId(Long categoryId);
}
