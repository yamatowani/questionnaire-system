import { gql } from '@apollo/client';

export const REGISTER_ADMIN_USER = gql`
  mutation registerAdminUser($registerAdminUserInput: RegisterAdminUserInput!) {
    registerAdminUser(registerAdminUserInput: $registerAdminUserInput) {
      success
      errorMessage
      user {
        id
        name
        email
        created_at
        updated_at
      }
    }
  }
`;

export const SUBMIT_SURVEY = gql`
  mutation submitSurvey($submitSurveyInput: SubmitSurveyInput!) {
    submitSurvey(submitSurveyInput: $submitSurveyInput) {
      success
      errorMessage
      survey {
        id
        title
        url
      }
    }
  }
`;

export const SUBMIT_ANSWER = gql`
  mutation submitAnswer($submitAnswerInput: SubmitAnswerInput!) {
    submitAnswer(submitAnswerInput: $submitAnswerInput) {
      success
      errorMessage
      answer {
        id
        question {
          id
          question_text
        }
        option {
          id
          option_text
        }
        other_response
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
