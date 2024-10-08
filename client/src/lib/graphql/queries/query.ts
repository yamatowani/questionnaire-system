import { gql } from "@apollo/client";

export const GET_ANSWER_BY_ADMIN_USER = gql`
  query GetQuestionsWithAnswerCounts($adminUserId: Int!) {
  getQuestionWithAnswerCounts(adminUserId: $adminUserId) {
    questionId
    title
    options {
      option_id
      option_text
      count
    }
  }
}
`;

export const GET_QUESTION_BY_URL = gql`
  query getQuestionByUrl($url: String!) {
    getQuestionByUrl(url: $url) {
      id
      title
      options {
        id
        option_text
      }
    }
  }
`;

export const GET_ADMIN_USERS = gql`
  query {
    admin_users {
      id
      name
      email
      password_digest
    }
  }
`;

export const GET_ALL_QUESTIONS_BY_ADMIN_USER_ID = gql`
  query getAllQuestionsByAdminUserId($adminUserId: Int!) {
    getAllQuestionsByAdminUserId(adminUserId: $adminUserId) {
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
