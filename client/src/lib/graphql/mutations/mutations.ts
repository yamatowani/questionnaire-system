import { gql } from '@apollo/client';

export const ADD_NEW_ADMIN_USER = gql`
  mutation AddNewAdminUser($newAdminUserData: NewAdminUserInput!) {
    addNewAdminUser(newAdminUserData: $newAdminUserData) {
      id
      name
      email
      password_digest
      created_at
      updated_at
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createQuestion($newQuestionInput: NewQuestionInput!) {
    createQuestion(newQuestionInput: $newQuestionInput) {
      id
      title
      url
      options {
        id
        option_text
      }
    }
  }
`;
