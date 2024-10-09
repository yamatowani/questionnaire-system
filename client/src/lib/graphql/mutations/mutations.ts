import { gql } from '@apollo/client';

export const REGISTER_ADMIN_USER = gql`
  mutation registerAdminUser($registerAdminUserInput: RegisterAdminUserInput!) {
    registerAdminUser(registerAdminUserInput: $registerAdminUserInput) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;

export const SUBMIT_QUESTION = gql`
  mutation submitQuestion($submitQuestionInput: SubmitQuestionInput!, $adminUserId: Int!) {
    submitQuestion(submitQuestionInput: $submitQuestionInput, adminUserId: $adminUserId) {
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
  mutation submitAnswer($submitAnswerInput: SubmitAnswerInput!) {
    submitAnswer(submitAnswerInput: $submitAnswerInput) {
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

export const AUTHENTICATE_ADMIN_USER = gql`
  mutation authenticateAdminUser($authenticateAdminUserInput: AuthenticateAdminUserInput!) {
    authenticateAdminUser(authenticateAdminUserInput: $authenticateAdminUserInput) {
      access_token
    }
  }
`;
