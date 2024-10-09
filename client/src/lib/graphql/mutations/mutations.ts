import { gql } from '@apollo/client';

export const REGISTER_ADMIN_USER = gql`
  mutation registerAdminUser($newAdminUserData: NewAdminUserInput!) {
    registerAdminUser(newAdminUserData: $newAdminUserData) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;

export const SUBMIT_QUESTION = gql`
  mutation submitQuestion($newQuestionInput: NewQuestionInput!, $adminUserId: Int!) {
    submitQuestion(newQuestionInput: $newQuestionInput, adminUserId: $adminUserId) {
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


export const SUBMIT_ANSWER = gql`
  mutation submitAnswer($newAnswerInput: NewAnswerInput!) {
    submitAnswer(newAnswerInput: $newAnswerInput) {
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

export const AUTHENITCATE_ADMIN_USER = gql`
  mutation authenticateAdminUser($authInput: AuthInput!) {
    authenticateAdminUser(authInput: $authInput) {
      access_token
    }
  }
`;
