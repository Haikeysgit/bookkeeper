import { gql } from '@apollo/client';

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

export const DELETE_BOOK = gql`
  mutation RemoveBook($id: Int!) {
    removeBook(id: $id)
  }
`;
