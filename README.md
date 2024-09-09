# Todo List API with JWT Authentication and Weather Integration

## Overview

This project is a simple Todo List API built using **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **TypeORM**. It includes features such as user authentication via **JWT** and weather data integration for Todo items using the **OpenWeatherMap API**.

## Features

1. **JWT Authentication**:
    - User login to generate JWT.
    - Secured routes that require a valid JWT.

2. **Todo List Management**:
    - Create, read, update, and delete Todo items.
    - Each Todo item has a `title`, `description`, `dueDate`, and `location`.

3. **Weather Service Integration**:
    - Fetch weather data for the location associated with a Todo item.

## Prerequisites

- **Node.js** v16.x or higher
- **PostgreSQL** v12.x or higher
- **Docker** and **Docker Compose** (optional, for running with Docker)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your_username/todo-api.git
cd todo-api
```

### 2. Environment Variables

Create a .env file in the root directory and set the following variables:
```bash
PORT=3000
DATABASE_URL=postgres://todo_user:password@localhost:5432/todo_db
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY=f88022c30ee50cead5b2e92d1082e59f
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

If you're not using Docker, set up the PostgreSQL database:

```bash
createdb todo_db
```

## Running the Project

1. **With Docker**
   1. Ensure Docker and Docker Compose are installed on your machine.
   2. Build and start the Docker containers:
   
      ```bash
      docker-compose up --build
      ```
   3. The application will be available at http://localhost:3000.

2. **Without Docker**
   - Start the server in watch mode for development:
   
     ```bash
     npm run start:dev
     ```
   - To start the server in regular mode:
   
     ```bash
     npm run start
     ```
