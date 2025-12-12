export type Option = {
  id: string;
  text: string;
  correct?: boolean;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: Option[];
};
