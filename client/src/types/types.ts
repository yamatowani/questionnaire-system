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
