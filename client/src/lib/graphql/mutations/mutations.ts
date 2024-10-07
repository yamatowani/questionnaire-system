import { gql } from '@apollo/client';

export const ADD_NEW_ADMIN_USER = gql`
  mutation AddNewAdminUser($newAdminUserData: NewAdminUserInput!) {
    addNewAdminUser(newAdminUserData: $newAdminUserData) {
      id
      name
      email
      password
      created_at
      updated_at
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createQuestion($createQuestionInput: NewQuestionInput!) {
    createQuestion(createQuestionInput: $createQuestionInput) {
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

export const CREATE_ANSWER = gql`
  mutation createAnswer($newAnswerInput: NewAnswerInput!) {
    createAnswer(newAnswerInput: $newAnswerInput) {
      question {
        id
        title
      }
      option {
        id
        option_text
      }
    }
  }
`;
