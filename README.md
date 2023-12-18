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


## Contact/Support
If you have any questions or need support, please contact fikrikhoironn@gmail.com or fikriranjabi02@gmail.com
