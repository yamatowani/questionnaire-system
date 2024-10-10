import { gql } from "@apollo/client";

export const QUESTION_RESULTS = gql`
  query questionResults {
  questionResults {
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
  query questionByUrl($url: String!) {
    questionByUrl(url: $url) {
      id
      title
      options {
        id
        option_text
      }
    }
  }
`;

export const GET_ALL_QUESTIONS_BY_ADMIN_USER_ID = gql`
  query questions {
    questions {
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
