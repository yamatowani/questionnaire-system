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
