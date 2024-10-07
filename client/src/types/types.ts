export type AdminUser = {
  id: number,
  name: string;
  email: string;
  password: string;
}

export type Question = {
  id: number;
  title: string;
  url: string;
  options: Option[];
}

export type Option = {
  id: number;
  option_text: string;
  question_id: string;
}

export type NewAdminUserInput = {
  name: string;
  email: string;
  password: string;
}

export type NewQuestionInput = {
  title: string;
  options: NewOptionInput[];
}

export type NewOptionInput = {
  option_text: string;
}

export type LoginResponse = {
  login: {
    access_token: string;
  };
}
