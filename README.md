# ExpressJS-API

A RESTful API built with Express.js and MongoDB, designed to handle questions, replies, and user management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [User Roles and Permissions](#user-roles-and-permissions)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Authentication & Authorization
- CRUD operations for questions and replies
- Role-based access control for Admin and User roles

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [MongoDB](https://www.mongodb.com/) instance running

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eccsm/ExpressJS-API.git
   cd ExpressJS-API
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Configuration

1. **Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/expressjs-api
     JWT_SECRET=your_jwt_secret
     ```

### Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```
   The API will be accessible at `http://localhost:3000/`.

## API Endpoints

### Users
- `POST /users/register` - Register a new user
- `POST /users/login` - Authenticate a user

### Questions
- `GET /questions` - Retrieve all questions
- `POST /questions` - Create a new question
- `GET /questions/:id` - Retrieve a specific question
- `PUT /questions/:id` - Update a question
- `DELETE /questions/:id` - Delete a question

### Replies
- `POST /questions/:questionId/replies` - Add a reply to a question
- `PUT /replies/:id` - Update a reply
- `DELETE /replies/:id` - Delete a reply

## User Roles and Permissions

### Admin
- Manage users (block, delete)
- Perform all actions that a regular user can

### User
- Post questions and replies

## Folder Structure

```
ExpressJS-API/
├── config/
│   └── env/
├── controllers/
├── helpers/
├── middlewares/
├── models/
├── public/
│   └── templates/
├── routers/
├── package.json
├── server.js
└── README.md
```

- `config/`: Configuration files
- `controllers/`: Request handlers
- `helpers/`: Utility functions
- `middlewares/`: Custom middleware
- `models/`: Mongoose schemas
- `public/`: Static files
- `routers/`: Route definitions

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

