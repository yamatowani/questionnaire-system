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
  question_id: number;
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
  question_text: string;
  has_multiple_options: boolean;
  allows_other: boolean;
  options: SubmitOptionInput[];
}

type SubmitOptionInput = {
  option_text: string;
}

export type AuthenticateAdminUserResponse = {
  authenticateAdminUser: {
    access_token: string;
  };
}
