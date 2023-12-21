# Baxture-Project

## Overview

This project implements a simple CRUD API with an in-memory database. Users can be created, retrieved, updated, and deleted using various API endpoints.

## Technical Requirements

- Node.js LTS version 20.9.0
- Asynchronous API design
- Code hosted on [GitHub](https://github.com/jivan-toshniwal/Baxture-Project)

## Implemented Endpoints

### 1. GET All Users

- **Endpoint:** `GET /api/users`
- **Response:** Status code 200 and all user records

### 2. GET User by ID

- **Endpoint:** `GET /api/users/{userId}`
- **Response:**
  - Status code 200 and user record with the specified ID if it exists
  - Status code 400 for invalid userID
  - Status code 404 if the record with the specified ID doesn't exist

### 3. POST Create User

- **Endpoint:** `POST /api/users`
- **Request Body:**

  ```json
  {
    "users": [
      {
        "username": "John Doe",
        "age": 25,
        "hobbies": ["Reading", "Gaming"]
      }
      // ... (other user objects)
    ]
  }
  ```

- **Response:** Status code 201 and newly created record or Status code 400 for missing required fields

### 4. PUT Update User by ID

- **Endpoint:** `PUT /api/users/{userId}`
- **Request Body:**
  ```json
  {
    "updateFields": {
      "hobbies": ["Badminton", "Coding", "Watching Movies"]
    }
  }
  ```
- **Response:**
  - Status code 200 and updated record
  - Status code 400 for invalid userID
  - Status code 404 if the record with the specified ID doesn't exist

### 5. DELETE User by ID

- **Endpoint:** `DELETE /api/users/{userId}`
- **Response:**
  - Status code 204 if the record is found and deleted
  - Status code 400 for invalid userID
  - Status code 404 if the record with the specified ID doesn't exist

## Users Data Structure

- **Properties:**
  - `id`: Unique identifier (string, UUID)
  - `username`: User's name (string, required)
  - `age`: User's age (number, required)
  - `hobbies`: User's hobbies (array of strings or empty array, required)

## Additional Features

### Development and Production Modes

- Run in development mode: `npm run start:dev` (uses nodemon)
- Run in production mode: `npm run start:prod` (builds and runs bundled file)

### Horizontal Scaling (Multi-worker Mode)

- Start multiple instances with load balancing: `npm run start:multi`

## Testing (Bonus Points)

- At least 3 test scenarios for API endpoints

## Author

- **Name:** Jivan Toshniwal
- **Contact:** 9822442282
- **GitHub Repository:** [Baxture-Project](https://github.com/jivan-toshniwal/Baxture-Project)
