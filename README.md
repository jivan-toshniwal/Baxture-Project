# Baxture Project

## Overview

This project implements a simple CRUD API using an in-memory database. Users can be created, retrieved, updated, and deleted through various API endpoints.

## Requirements

- Node.js LTS version 20.9.0
- MongoDB (for production use)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jivan-toshniwal/Baxture-Project.git
   ```

2. Install dependencies:

   ```bash
   cd Baxture-Project
   npm install
   ```

3. Create a `.env` file in the project root with the following content:

   ```
   PORT=4000
   MONGODB=<your_mongodb_connection_string>
   ```

   Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.

4. Start the application in development mode:

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:4000/api`.

## Scaling

### Development Mode

To run the application in development mode using nodemon, use:

```bash
npm run start:dev
```

### Production Mode

To run the application in production mode (after building), use:

```bash
npm run start:prod
```

### Horizontal Scaling

For horizontal scaling with a load balancer, use:

```bash
npm run start:multi
```

This command starts multiple instances using the Node.js Cluster API, each listening on a different port. The load balancer listens on `http://localhost:4000/api` and distributes requests across the worker instances.

## MongoDB Setup

For production use, make sure to replace the in-memory database with MongoDB. Update the `.env` file with your MongoDB connection string.

## Testing

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
