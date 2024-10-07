export type AdminUser = {
  id: string,
  name: string;
  email: string;
  password_digest: string;
  session_id: string;
}

export type NewAdminUserInput = {
  name: string;
  email: string;
  password_digest: string;
}

export type NewQuestionInput = {
  title: string;
  options: NewOptionInput[];
}

export type NewOptionInput = {
  option_text: string;
}
