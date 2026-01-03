# BookKeeper - Full Stack Book Management Application

A modern book management application built with React, NestJS, GraphQL, and Auth0 authentication.

## Features

- User authentication with Auth0
- CRUD operations for books via GraphQL API
- Category-based filtering
- Grid and table view modes
- Premium UI with glassmorphism design
- SQLite database with automatic seeding

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Chakra UI for components
- Apollo Client for GraphQL
- Framer Motion for animations

**Backend:**
- NestJS with TypeScript
- GraphQL with Apollo Server
- TypeORM with SQLite
- Passport.js with Auth0 JWT

## Prerequisites

- Node.js 18+
- npm or yarn
- Auth0 account (free tier)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bookkeeper.git
cd bookkeeper
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_AUDIENCE=https://your-api-identifier
```

Start the backend:
```bash
npm run start:dev
```

The GraphQL API will be available at `http://localhost:3000/graphql`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://your-api-identifier
VITE_API_URL=http://localhost:3000/graphql
```

Start the frontend:
```bash
npm run dev
```

The application will be available at `http://localhost:5175`

## Auth0 Configuration

1. Create an Auth0 account at https://auth0.com
2. Create a new Single Page Application
3. Create a new API with your chosen identifier
4. Configure the following URLs in your Auth0 app settings:
   - Allowed Callback URLs: `http://localhost:5175`
   - Allowed Logout URLs: `http://localhost:5175`
   - Allowed Web Origins: `http://localhost:5175`

## Project Structure

```
bookkeeper/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Auth0 JWT authentication
│   │   ├── books/          # Book CRUD operations
│   │   ├── app.module.ts   # Root module
│   │   └── main.ts         # Entry point
│   └── database.sqlite     # SQLite database
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # UI components
    │   ├── graphql/        # GraphQL queries
    │   ├── App.tsx         # Root component
    │   └── theme.ts        # Chakra UI theme
    └── index.html
```

## API Endpoints

The GraphQL API exposes the following operations:

**Queries:**
- `books` - Get all books
- `book(id)` - Get a single book

**Mutations:**
- `createBook(input)` - Create a new book
- `updateBook(input)` - Update an existing book
- `removeBook(id)` - Delete a book

## License

MIT
