export type AdminUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export type Survey = {
  id: number;
  title: string;
  url: string;
  questions: [Question]
  created_at: string;
  updated_at: string;
}

export type Question = {
  id: number;
  question_text: string;
  has_multiple_options: boolean;
  allows_other: boolean;
  options: Option[];
  created_at: string;
  updated_at: string;
}

export type Option = {
  id: number;
  option_text: string;
  questio_id: number;
  created_at: string;
  updated_at: string;
}

export type RegisterAdminUserInput = {
  name: string;
  email: string;
  password: string;
}

export type SubmitSurveyInput = {
  title: string;
  questions: SubmitQuestionInput[];
}

type SubmitQuestionInput = {
  questionText: string;
  hasMultipleOptions: boolean;
  allowsOther: boolean;
  options: SubmitOptionInput[];
}

type SubmitOptionInput = {
  optionText: string;
}

export type AuthenticateAdminUserResponse = {
  authenticateAdminUser: {
    accessToken: string;
  };
}

export type SubmitAnswerInput = {
  question_answers: SubmitQuestionAnswerInput[];
}
export type SubmitQuestionAnswerInput = {
  questionId: number;
  options: SubmitOptionAnswerInput[];
}

type SubmitOptionAnswerInput = {
  optionId: number;
  otherResponse: string;
}
