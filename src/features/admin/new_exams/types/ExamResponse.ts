export interface ExamResponse {
  id: string;
  name: string;
  time?: number;
  __tag__?: string;
  __groupQuestions__: groupQuestionResponse[];
}

export interface groupQuestionResponse {
  id: string;
  detail?: string;
  describeAnswer?: string;
  __questions__: questionResponse[];
  __questionMedia__: questionMediaResponse[];
  __part__: partResponse;
}

export interface questionResponse {
  id: string;
  questionNumber: number;
  question: string;
  answer: string[];
  correctAnswer: string;
  explain?: string;
}

export interface questionMediaResponse {
  id: string;
  type: string;
  url: string;
  index: number;
}

export interface partResponse {
  id: string;
  name: string;
  totalQuestion: number;
}
