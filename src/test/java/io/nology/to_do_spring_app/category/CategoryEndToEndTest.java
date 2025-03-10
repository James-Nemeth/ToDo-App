package io.nology.to_do_spring_app.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import io.restassured.RestAssured;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class CategoryEndToEndTest {
    @LocalServerPort
    private int port;

    @Autowired
    private CategoryRepository categoryRepo;

    private Category testCategory;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        categoryRepo.deleteAll();

        testCategory = new Category();
        testCategory.setName("Work");
        testCategory = categoryRepo.save(testCategory);
    }

    @Test
    public void getAllCategories_GetCategoriesIfAnyExist_ReturnsCategories() {
        given()
                .when()
                .get("/categories")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(1))
                .body("name", hasItems("Work"));
    }

    @Test
    public void getCategoryById_FindCategoryIfItHasAValidId_ReturnsCategory() {
        Long ID = testCategory.getId();

        given()
                .when()
                .get("/categories/" + ID)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo("Work"));
    }

    @Test
    public void createCategory_CreatesCategroyIfDataIsValid_ReturnsSuccess() {
        CreateCategoryDTO categoryDTO = new CreateCategoryDTO("Personal");

        given()
                .contentType("application/json")
                .body(categoryDTO)
                .when()
                .post("/categories")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo("Personal"));
    }

    @Test
    public void updateCategory_UpdatesCategroyIfDataIsValid_ReturnsUpdatedCategory() {
        Long ID = testCategory.getId();
        CreateCategoryDTO updateDTO = new CreateCategoryDTO("Updated Work");

        given()
                .contentType("application/json")
                .body(updateDTO)
                .when()
                .put("/categories/" + ID)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo("Updated Work"));
    }

}
