# BookKeeper - Full Stack Book Management Application

A modern book management application built with React, NestJS, GraphQL, and Auth0 authentication.

## 🌐 Live Demo

- **Frontend:** https://bookkeeper-seven.vercel.app
- **Backend API:** https://bookkeeper-production-4869.up.railway.app/graphql

## ✨ Features

- User authentication with Auth0
- CRUD operations for books via GraphQL API
- Category-based filtering
- Grid and table view modes
- Responsive design with premium UI
- SQLite database with automatic seeding

## 🛠 Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 + TypeScript | NestJS + TypeScript |
| Vite | GraphQL + Apollo Server |
| Chakra UI | TypeORM + SQLite |
| Apollo Client | Passport.js + Auth0 JWT |
| Framer Motion | |

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Auth0 account (free tier)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_AUDIENCE=https://your-api-identifier
```

Start the backend:
```bash
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:
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

## 📁 Project Structure

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

## 📡 GraphQL API

**Queries:**
- `books` - Get all books
- `book(id)` - Get a single book

**Mutations:**
- `createBook(input)` - Create a new book
- `updateBook(input)` - Update an existing book
- `removeBook(id)` - Delete a book

## 📄 License

MIT
