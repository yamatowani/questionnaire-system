import { gql } from "@apollo/client";

export const SURVEY_BY_URL = gql`
  query surveyByUrl($url: String!) {
    surveyByUrl(url: $url) {
      id
      title
      questions {
        id
        question_text
        hasMultipleOptions
        allowsOther
        options {
          id
          optionText
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
    }
  }
`;

export const SURVEY_RESULT = gql`
  query surveyResult($url: String!) {
    surveyResult(url: $url) {
      surveyId
      title
      questionResults {
        questionId
        questionText
        answerCounts {
          option_id
          optionText
          count
        }
      otherCount
      otherResponses
      }
    }
  }
`;
