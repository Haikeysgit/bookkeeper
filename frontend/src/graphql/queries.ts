/**
 * GraphQL Queries and Mutations
 * 
 * Defines all GraphQL operations for the Book entity.
 * These are used by Apollo Client to communicate with the backend API.
 */

import { gql } from '@apollo/client';

/** Fetch all books from the database */
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      description
      category
    }
  }
`;

/** Fetch a single book by ID */
export const GET_BOOK = gql`
  query GetBook($id: Int!) {
    book(id: $id) {
      id
      name
      description
      category
    }
  }
`;

/** Create a new book */
export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      id
      name
      description
      category
    }
  }
`;

/** Update an existing book */
export const UPDATE_BOOK = gql`
  mutation UpdateBook($updateBookInput: UpdateBookInput!) {
    updateBook(updateBookInput: $updateBookInput) {
      id
      name
      description
      category
    }
  }
`;

/** Delete a book by ID */
export const DELETE_BOOK = gql`
  mutation RemoveBook($id: Int!) {
    removeBook(id: $id)
  }
`;
