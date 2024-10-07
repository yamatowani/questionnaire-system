import { gql } from "@apollo/client";

export const GET_ANSWER_BY_QUESTION_ID = gql`
  query getAnswerByQuestion($question_id: Int!) {
    getAnswerByQuestion(question_id: $question_id) {
      option {
        id
        option_text
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
  query getAllQuestionsByAdminUserId($adminUserId: Float!) {
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
