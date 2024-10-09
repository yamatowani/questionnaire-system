export type AdminUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export type Question = {
  id: number;
  title: string;
  url: string;
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

export type SubmitQuestionInput = {
  title: string;
  options: SubmitOptionInput[];
}

export type SubmitOptionInput = {
  option_text: string;
}

export type AuthenticateAdminUserResponse = {
  authenticateAdminUser: {
    access_token: string;
  };
}
