package io.nology.to_do_spring_app.todo;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.nology.to_do_spring_app.category.Category;
import io.nology.to_do_spring_app.category.CategoryRepository;
import io.restassured.RestAssured;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TodoEndToEndTest {
    @LocalServerPort
    private int port;

    private ArrayList<Todo> todos = new ArrayList<>();

    @Autowired
    private TodoRepository todoRepo;
    @Autowired
    private CategoryRepository categoryRepo;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        todoRepo.deleteAll();
        todos.clear();

        Category testCategory = new Category();
        testCategory.setName("Work");

        testCategory = categoryRepo.save(testCategory);

        Todo task1 = new Todo();
        task1.setTask("Write test code");
        task1.setCategory(testCategory);
        task1.setIsArchived(false);
        task1.setCompleted(false);
        this.todoRepo.save(task1);
        todos.add(task1);

        Todo task2 = new Todo();
        task2.setTask("Refine Frontend Code");
        task2.setCategory(testCategory);
        task2.setIsArchived(false);
        task2.setCompleted(true);
        this.todoRepo.save(task2);
        todos.add(task2);
    }

    @Test
    public void getAllTodos_TodosInDBWithIsarchivedAsFalse_ReturnsSuccess() {
        given().when()
                .get("/todos")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(2))
                .body("task", hasItems("Write test code", "Refine Frontend Code"));
    }

    @Test
    public void getAllTodos_NoTodosInDB_ReturnsEmptyArray() {
        this.todoRepo.deleteAll();
        given().when()
                .get("/todos")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(0));
    }

}
