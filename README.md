# Task Management System

A full-stack web application for managing tasks, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, read, update, and delete tasks
- Task prioritization (low, medium, high)
- Task status tracking (pending, in-progress, completed)
- Responsive design with Bootstrap
- State management with Redux
- RESTful API with Express
- MongoDB database integration

## Tech Stack

### Frontend

- React 18
- Redux Toolkit
- React Router DOM
- Bootstrap 5
- Axios
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

task-management-system/
├── client/ # Frontend React application
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── redux/ # Redux store and slices
│ │ ├── App.jsx # Main application component
│ │ └── main.jsx # Application entry point
│ └── package.json
│
└── server/ # Backend Node.js application
├── models/ # MongoDB models
├── routes/ # API routes
├── server.js # Express server setup
└── package.json

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-management-system
```

2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Install backend dependencies:

```bash
cd ../server
npm install
```

4. Create a `.env` file in the server directory:
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/task-management

### Running the Application

1. Start the backend server:

```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend:

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

- GET `/api/tasks` - Get all tasks
- GET `/api/tasks/:id` - Get a single task
- POST `/api/tasks` - Create a new task
- PATCH `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
