# Breeze Backend Service

## Description
Breeze Backend Service is the core backend system for Breeze Mobile App, built using Express, TypeScript, Prisma Schema, and Supabase. 
## Installation and Setup

### Prerequisites
- Node.js
- Yarn

### Clone the Repository
```bash
git clone https://github.com/bangkit-breeze/breeze-backend-service.git
cd breeze-backend-service
```

### Install Dependencies
```bash
yarn install
```

## Configuration

### Environment Variables
Copy the `.env.example` file to a new file named `.env` and fill in the necessary details.
- `PORT`: Port number for the server.
- `DATABASE_URL`: Database connection URL.
- `SECRET`: Secret key for JWT or other purposes.
- `SALT_ROUNDS`: Salt rounds for password hashing.

## Database Setup

### Prisma Schema
Prisma is used for database management. To set up your database and run migrations, use the following command:
```bash
npx prisma migrate dev
```

## Running the Application
Start the server with the following command:
```bash
yarn start
```

## Project Structure
- `.github/workflows`: Contains CI/CD workflows.
- `.husky`: Git hooks configuration.
- `prisma`: Prisma schema and migrations.
- `src`: Source code including controllers, services, repositories, etc.
- `Dockerfile`: Docker container configuration.
- Other important directories and files.

# Backend Express API Collection

## Overview
This README documents the endpoints available in the Backend Express API collection. This collection is designed to provide a comprehensive set of API endpoints for authentication, user management, event handling, article retrieval, leaderboard statistics, emission tracking, and project management.

## Authentication
### Register
- **Endpoint**: `POST /api/v1/register`
- **Description**: Register a new user.

### Login
- **Endpoint**: `POST /api/v1/login`
- **Description**: Authenticate a user and receive a token.

## User
### Get Profile
- **Endpoint**: `GET /api/v1/users/profile`
- **Description**: Retrieve the profile of the logged-in user.

### Get Statistic
- **Endpoint**: `GET /api/v1/users/statistic`
- **Description**: Get user-specific statistics.

### Get History
- **Endpoint**: `GET /api/v1/users/history`
- **Description**: Fetch the history of user activities.

## Event
### Create Event
- **Endpoint**: `POST /api/v1/events`
- **Description**: Create a new event.

### Get All Event
- **Endpoint**: `GET /api/v1/events`
- **Description**: Retrieve all events.

### Get User Joined Event
- **Endpoint**: `GET /api/v1/events?status=joined`
- **Description**: Get events joined by the user.

### Get User Finished Event
- **Endpoint**: `GET /api/v1/events?status=finished`
- **Description**: Get events finished by the user.

### Get Event Detail
- **Endpoint**: `GET /api/v1/events/6`
- **Description**: Retrieve details of a specific event.

### Join Event
- **Endpoint**: `POST /api/v1/events/6/join`
- **Description**: Join a specific event.

### Upload Event Evidence
- **Endpoint**: `POST /api/v1/events/4/upload-evidence`
- **Description**: Upload evidence for an event.

### Get Popular Events
- **Endpoint**: `GET /api/v1/events/popular`
- **Description**: Retrieve popular events.

## Article
### Get All Article
- **Endpoint**: `GET /api/v1/articles`
- **Description**: Fetch all articles.

## Leaderboard
### Get Leaderboard Weekly
- **Endpoint**: `GET /api/v1/leaderboard/weekly`
- **Description**: Retrieve weekly leaderboard stats.

### Get Leaderboard All Time
- **Endpoint**: `GET /api/v1/leaderboard/alltime`
- **Description**: Get all-time leaderboard statistics.

## Emission Log
### Emission Log: Vehicle
- **Endpoint**: `POST /api/v1/emission/tracking/vehicle`
- **Description**: Log vehicle emissions.

### Food Tracker Predict
- **Endpoint**: `POST /api/v1/emission/tracking/food/predict`
- **Description**: Predict emissions from food items.

### Food Tracker Add
- **Endpoint**: `POST /api/v1/emission/tracking/food/add`
- **Description**: Add food item for emission tracking.

## Projects
### Get All Projects
- **Endpoint**: `GET /api/v1/projects`
- **Description**: Retrieve all projects.

### Get Project by Id
- **Endpoint**: `GET /api/v1/projects/1`
- **Description**: Get details of a specific project.

## Ping
### Ping
- **Endpoint**: `GET /api/v1/ping`
- **Description**: Check the status of the API server.

## Usage
To use these endpoints, import the collection into Postman. Replace `{{base_url}}` with the actual base URL of the API. Authentication endpoints will provide a token that should be used as `{{token}}` in subsequent requests.

## Contact/Support
If you have any questions or need support, please contact fikrikhoironn@gmail.com or fikriranjabi02@gmail.com


