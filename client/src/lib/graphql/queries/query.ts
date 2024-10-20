import { gql } from "@apollo/client";

export const SURVEY_BY_URL = gql`
  query surveyByUrl($url: String!) {
    surveyByUrl(url: $url) {
      id
      title
      questions {
        id
        question_text
        has_multiple_options
        allows_other
        options {
          id
          option_text
        }
      }
    }
  }
`;
export const SURVEYS = gql`
  query surveys {
    surveys {
      id
      title
      url
      questions {
        id
        question_text
        options {
          id
          option_text
        }
      }
    }
  }
`;

export const SURVEY_RESULT = gql`
  query surveyResult($url: String!) {
    surveyResult(url: $url) {
      surveyId
      title
      questions {
        questionId
        questionText
        questionResults {
          option_id
          optionText
          count
        }
      }
    }
  }
`;
