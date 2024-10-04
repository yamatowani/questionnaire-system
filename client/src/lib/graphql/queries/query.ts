import { gql } from "@apollo/client";

export const GET_ANSWER_BY_QUESTION_ID = gql`
  query getAnswerByQuestion($question_id: Int!) {  // 引数を定義
    getAnswerByQuestion(question_id: $question_id) {  // 引数を使用
      option {
        id
        option_text
      }
    }
  }
`;
