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
    }
  }
`;

export const SURVEY_RESULT = gql`
  query surveyResult($url: String!) {
    surveyResult(url: $url) {
      surveyId
      title
      answer_count
      questionResults {
        questionId
        questionText
        answerCounts {
          optionId
          optionText
          count
        }
      otherCount
      otherResponses
      }
    }
  }
`;
