# BookKeeper

A full-stack book management application built with React, NestJS, GraphQL, and Auth0.

## Live Demo

- Frontend: https://bookkeeper-seven.vercel.app
- Backend: https://bookkeeper-production-4869.up.railway.app/graphql

## Tech Stack

**Frontend:** React, TypeScript, Vite, Chakra UI, Apollo Client

**Backend:** NestJS, TypeScript, GraphQL, TypeORM, SQLite

**Auth:** Auth0

## Running Locally

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Runs on `http://localhost:3000/graphql`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5175`

## Environment Variables

Both frontend and backend require `.env` files. See `.env.example` in each folder for required variables.

## Features

- Sign up and sign in with Auth0
- View books in grid or table layout
- Create, edit, and delete books
- Filter by category
