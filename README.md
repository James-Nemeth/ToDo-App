[![Spring/Java Backend Tests](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-backend.yml/badge.svg)](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-backend.yml) <br>
[![React/TS Frontend Tests](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-frontend.yml/badge.svg)](https://github.com/James-Nemeth/ToDo-App/actions/workflows/ci-frontend.yml)

# Todos API

## Overview

Create an API to be integrated with your [todos-ui](../todos-ui/) project, that allows you to store and retrieve tasks from a database.

## MVP

- Deleting a task should set an `isArchived` flag in the database instead of deleting the task from the database
- Add a filter to the frontend application that allows you to filter tasks by category
- Categories and Todos should be stored in separate tables

## Endpoints

- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

- `GET /todos`
- `GET /todos?category={}`
- `POST /todos`
- `PUT /todos/:id`
- `DELETE /todos/:id`

## Stack

- Spring Boot
- Hibernate ORM
- Model Mapper is **optional**
- Testing is **optional** but **reccomended**

# Todos UI

## Overview

Your task is to create an application that allows you to track, add, and delete tasks as well as manage categories of tasks.

![Todos UI Example](assets/todos_app.PNG)

## MVP

- Must be able to add categories
- Must be able to add new tasks tagged with a task category
- Must be able to update tasks automatically by changing the task name and the category / edit button is fine
- Must be able to duplicate tasks
- Must be able to delete tasks (remember this is soft delete, in the backend it will be isArchived)
- You must add your own styling

## Bonus

- Come up with a feature that allows us to delete and update task categories
  - Consider what happens to a Task that has had it's category deleted
- Create a summary section that lists how many of each type of task there are
- Add a due date, and ability to sort/filter by that
- Add a priorty field, and ability to sort/filter
- Any business logic you think is interesting
  - Ask a coach how feasible it is

## Stack

- React with TypeScript
  - NextJs **with coach confirmation**
- Component Libraries allowed but **discouraged**
  - Talk to a coach
- Tailwind **optional**
- React Hook Form **optional** - but strongly **encouraged**
