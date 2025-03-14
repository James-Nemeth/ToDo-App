<h1 align="center">📝 TaskFlow 📝</h1>

[![Spring/Java Backend Tests](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-backend.yml/badge.svg)](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-backend.yml) <br>
[![React/TS Frontend Tests](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-frontend.yml/badge.svg)](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-frontend.yml)

## Demo & Snippets

https://james-nemeth.github.io/ToDo-App/
![App Screenshot](https://github.com/James-Nemeth/ToDo-App/blob/main/TaskFlowScreenShot.png)

---

# Todo API

Create an API to be integrated with your todos UI project, that allows you to store and retrieve tasks from a database.

## MVP

- Deleting a task should set an `isArchived` flag in the database instead of deleting the task from the database
- Add a filter to the frontend application that allows you to filter tasks by category
- Categories and Todos should be stored in separate tables
- Have a completed tab that shows all tasks that are set as `isCompleted`.

## Endpoints

- `GET /categories`
- `POST /categories`

- `GET /todos`
- `GET /todos?category={}`
- `POST /todos`
- `PUT /todos/:id`
- `DELETE /todos/:id`

## Stack

- Spring Boot
- Java
- Hibernate ORM
- Testing using h2, rest-assured and spring-boot-starter-test

---

# Todos UI

Your task is to create an application that allows you to track, add, and delete tasks as well as manage categories of tasks.

## MVP

- Must be able to add categories
- Must be able to add new tasks tagged with a category
- Must be able to update tasks automatically by changing the task name using an edit button
- Must be able to delete tasks (remember this is soft delete, in the backend it will be isArchived)
- You must add your own styling

## Stack

- React with TypeScript
- Tailwind 
- React Hook Form
- Zod
- Axios

---

## Build Steps

### Prerequisites
1. **Install Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
2. **Install Java**: Ensure you have [Java JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) installed.
3. **Install Maven**: [Maven](https://maven.apache.org/install.html) is required to build the Spring Boot backend.
4. **Install MySQL**: You need [MySQL](https://dev.mysql.com/downloads/mysql/) for the database.

### Setting Up the Database
1. Go to MySQL Worksbench and create a new database called `todo_db`.
   ```bash
   CREATE DATABASE todo_db; 
   ```
2. In Visual Studio Code, create a `.env` file in the root directory of your project and add the following:
    ```plaintext
    DB_NAME=todo_db
    DB_USER=root
    ```
2. **IF ON WINDOWS ADD (apple users can ignore this step)**
    ```plaintext
    DB_PASSWORD={your_password}
    ```    

### Backend (Spring Boot/Java)
1. Build the project using Maven:
    ```bash
    ./mvnw clean install
    ```
2. Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend (React/TypeScript)
1. Navigate to the frontend directory:
    ```bash
    cd To-Do-App_Frontend/
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

### Run the Application
- Open a browser and navigate to `http://localhost:5173/ToDo-App` to see the frontend.
- The backend API will be running at `http://localhost:8080`.

---

## Design Goals / Approach

-   The primary goal of this project is to create a Todo List App that is accessible to anyone.
-   The app should allow users to easily track tasks that are active and tasks that are completed.
-   Security is a high priority, with comprehensive testing implemented on both the frontend and backend.
-   The design and styling aim to present a premium and clean look to enhance user experience.

---

## Features

-   A 2-page questionnaire will start when the app runs to allow users to have tasks and categories made and available before the user gets to the main home page.
-   Tasks can be filtered based on the category that is attached to the task, it will only display the tasks with the same category or users can show all categories.
-   There is a theme toggle to allow users to choose their preference between light mode or dark mode.
-   Git workflow has been set up so that when a commit is added to the main branch, the frontend and backend tests run and display the results as a badge in the README.

---

## Known issues

-   No ability to delete categories
-   Refreshing on browser take user back to the Landing Page

---

## Future Goals

-   Add more testing/error handling/ buisness logic to the backend

---

## What did you struggle with?

-   Setting up the Git Workflow as it is my first time setting it up for my project. Was a good experience and feel like l know what to do for next time
-   Refactoring code blocks into context then spreading it throughout the frontend code. Should have started adding code to context files earlier but because l left it a bit late, it made it harder to refactor

---
