# Library API Assignment

Welcome to the backend assignment! Your task is to build a RESTful API for a simple Library Management System using Hono, Drizzle ORM, and PostgreSQL.

## Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/products/docker-desktop/)

## Getting Started

1. **Setup Environment & Install**

   ```bash
   # Copy the environment file
   cp .env.example .env

   # Install dependencies
   bun install
   ```

2. **Run Database & Apply Schema**

   ```bash
   # Start the database container in the background
   docker-compose -f docker-compose.dev.yml up -d

   # Apply the database schema
   bun run db:push

   # Seed database (optional, will insert some sample books)
   bun run db:seed
   ```

   Make sure your migrations have been applied to the database. You can verify the database using this command:

   ```bash
   bun run db:studio
   # then open the link provided (usually https://local.drizzle.studio)
   ```

3. **Run the Application**

   ```bash
   bun run dev
   ```

4. **Access the Application**
   Open [http://localhost:5000](http://localhost:5000). Documentation is available at [http://localhost:5000/docs](http://localhost:5000/docs).

## Assignment Details

We have provided the boilerplate code and database connection. We have also provided a `book.schema.ts` inside `src/db/schema/`.

Your task is to implement the following endpoints:

1. **GET `/api/library/status`**
   - Returns basic statistics: `totalBooks` and `totalAvailable`.
2. **GET `/api/books`**
   - Retrieves all books from the database.
   - **Requirement**: Must accept an optional query parameter `isAvailable` (boolean) to filter the books.
3. **GET `/api/books/{id}`**
   - Retrieves a specific book by its ID.
4. **POST `/api/books`**
   - Creates a new book. By default, `isAvailable` should be `true`.
   - Body Requirements:
     - `title`: string (required)
     - `author`: string (required)
     - `publishedYear`: number (optional)
5. **PATCH `/api/books/{id}`**
   - Edits a book by its ID.
   - Body Requirements:
     - `title`: string | null
     - `author`: string | null
     - `isAvailable`: boolean | null
     - `publishedYear`: number | null
   - (Null means do not update the field)
6. **DELETE `/api/books/{id}`**
   - Deletes a book by its ID.

Good luck!
