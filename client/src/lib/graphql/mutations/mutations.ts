import { gql } from '@apollo/client';

export const ADD_NEW_ADMIN_USER = gql`
  mutation AddNewAdminUser($newAdminUserData: NewAdminUserInput!) {
    addNewAdminUser(newAdminUserData: $newAdminUserData) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createQuestion($newQuestionInput: NewQuestionInput!, $adminUserId: Float!) {
    createQuestion(newQuestionInput: $newQuestionInput, adminUserId: $adminUserId) {
      id
      title
      url
      options {
        id
        option_text
      }
      admin_user {
        id
        name
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

export const LOGIN = gql`
  mutation login($authInput: AuthInput!) {
    login(authInput: $authInput) {
      access_token
    }
  }
`;
