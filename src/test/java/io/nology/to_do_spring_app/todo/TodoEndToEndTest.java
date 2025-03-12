package io.nology.to_do_spring_app.todo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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

    private Category testCategory;
    private Category anotherTestCategory;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        todoRepo.deleteAll();
        categoryRepo.deleteAll();
        todos.clear();

        testCategory = new Category();
        testCategory.setName("Work");
        testCategory = categoryRepo.save(testCategory);

        anotherTestCategory = new Category();
        anotherTestCategory.setName("Life");
        anotherTestCategory = categoryRepo.save(anotherTestCategory);

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

        Todo task3 = new Todo();
        task3.setTask("Go For a 5 km run");
        task3.setCategory(anotherTestCategory);
        task3.setIsArchived(false);
        task3.setCompleted(false);
        this.todoRepo.save(task3);
        todos.add(task3);
    }

    @Test
    public void getAllTodos_TodosInDBWithIsArchivedAsFalse_ReturnsSuccess() {
        given().when()
                .get("/todos")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(3))
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

    @Test
    public void getTodoById_TodoInDBWithvalidID_ReturnsTodo() {
        Long ID = todos.get(0).getId();

        given()
                .when()
                .get("/todos/" + ID)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("task", equalTo("Write test code"));
    }

    @Test
    public void createTodo_CreatedTodoWithValidData_ReturnsSuccess() {
        CreateTodoDTO todoDTO = new CreateTodoDTO("Write tests", false, testCategory.getId());

        given().contentType("application/json")
                .body(todoDTO)
                .when()
                .post("/todos")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("task", equalTo("Write tests"))
                .body("category.id", equalTo(testCategory.getId().intValue()));
    }

    @Test
    public void createTodo_DuplicateTask_ThrowsError() {
        Todo duplicateTodo = new Todo();
        duplicateTodo.setTask("Test Duplicate");
        duplicateTodo.setCategory(testCategory);
        todoRepo.save(duplicateTodo);

        CreateTodoDTO todoDTO = new CreateTodoDTO("Test Duplicate", false, testCategory.getId());

        given()
                .contentType("application/json")
                .body(todoDTO)
                .when()
                .post("/todos")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void updateTodo_UpdatesTodoWithValidData_ReturnsUpdatedTodo() {
        Todo updatedTodo = todos.get(0);

        UpdateTodoDTO updateDTO = new UpdateTodoDTO("Testing Update Methods", true, testCategory.getId());

        given()
                .contentType("application/json")
                .body(updateDTO)
                .when()
                .put("/todos/" + updatedTodo.getId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("task", equalTo("Testing Update Methods"))
                .body("completed", equalTo(true));
    }

    @Test
    public void updateTodo_TodoNotFoundWithID_ThrowsNotFoundError() {
        UpdateTodoDTO updateTask = new UpdateTodoDTO("Not found task", true, testCategory.getId());

        given()
                .contentType("application/json")
                .body(updateTask)
                .when()
                .put("/todos/1000")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void updatePartialTodo_ValidData_ReturnsUpdatedTodo() {
        Long ID = todos.get(0).getId();

        Map<String, Object> updateTask = new HashMap<>();
        updateTask.put("task", "Work on Partial Update Test");
        updateTask.put("completed", true);

        given()
                .contentType("application/json")
                .body(updateTask)
                .when()
                .patch("/todos/" + ID)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("task", equalTo("Work on Partial Update Test"))
                .body("completed", equalTo(true))
                .body("isArchived", equalTo(false));
    }

    @Test
    public void archiveTodo_ValidTodoToSetIsArchived_ReturnsArchivedTodo() {
        Long ID = todos.get(0).getId();

        given()
                .when()
                .delete("/todos/" + ID)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("isArchived", equalTo(true));
    }

    @Test
    public void getTodosByCategory_ValidCategory_ReturnsTodos() {
        Long ID = testCategory.getId();

        given()
                .when()
                .get("/todos?category=" + ID)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(2))
                .body("task", hasItems("Write test code", "Refine Frontend Code"));
    }

}
