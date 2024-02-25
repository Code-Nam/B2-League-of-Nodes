# League of Nodes

This is a full-stack JavaScript application intended for a school assignment that uses Express.js for the backend and vanilla JavaScript for the frontend. The backend interacts with a Prisma database to manage data.

## Features

- Add Champion
- Search Champion
- Delete Champion
- Modify Champion

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository:

```sh
git clone <repository-url>
```

2. Navigate to the backend directory:

```sh
cd backend
```

3. Install the dependencies:

```sh
npm install
```

4. Copy the `.env.example` file and rename it to `.env`. Update the environment variables as needed.

5. Start your local server environment for the database (such as [laragon](https://laragon.org/index.html))

6. Run the Prisma migrations to set up the database:

```sh
npx prisma migrate dev
```

7. Seed the database:

```sh
npm run seed
```

8. Start the backend server:

```sh
npm run dev
```

9. Open another terminal, navigate to the frontend directory, and start a server (like `live-server` or `http-server`):

```sh
cd ../frontend
live-server
```

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

The backend is an Express.js application. It is organized into several directories:

- `controllers`: Contains the logic for handling requests and responses.
- `data`: Contains JSON data.
- `middlewares`: Contains middleware functions for handling authentication and other tasks.
- `prisma`: Contains Prisma-related files, including the schema and migrations.
- `routes`: Contains the routes for the application.

### Frontend

The frontend is a simple HTML/CSS/JavaScript application. It is organized into a few directories:

- `js`: Contains JavaScript files.

## Built With

- [Express.js](https://expressjs.com/) - The web framework used for the backend
- [Prisma](https://www.prisma.io/) - The database toolkit used
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used for generating JWTs for authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Used for password hashing