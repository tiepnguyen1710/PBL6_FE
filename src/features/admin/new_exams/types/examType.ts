export enum validateState {
  blank = "BLANK",
  pending = "PENDING",
  fulfilled = "FULFILLED",
}

export interface partData {
  part: string;
  groupQuestionData: groupQuestionData[];
}

export interface groupQuestionData {
  validate?: validateState;
  audioUrl?: string | null;
  audioPreview?: string;
  image?: { imageUrl: string; index: number }[];
  imagePreview?: string[];
  passage?: string;
  questionData: questionData[];
}

export interface questionData {
  questionNumber: number;
  question: string;
  answer: string[];
  correctAnswer?: string;
  // optionA?: string;
  // optionB?: string;
  // optionC?: string;
  // optionD?: string;
}

export interface part {
  id: string;
  name: string;
  totalQuestion: number;
}
[];

export const TOEIC_PARTS = {
  Part1: {
    questionCount: 6,
    questionPerGroup: 1,
    answerCount: 4,
    groupQuestion: 6,
    start: 1,
  },
  Part2: {
    questionCount: 25,
    questionPerGroup: 1,
    answerCount: 3,
    groupQuestion: 25,
    start: 7,
  },
  Part3: {
    questionCount: 39,
    questionPerGroup: 3,
    answerCount: 4,
    groupQuestion: 13,
    start: 32,
  },
  Part4: {
    questionCount: 30,
    questionPerGroup: 3,
    answerCount: 4,
    groupQuestion: 10,
    start: 71,
  },
  Part5: {
    questionCount: 30,
    questionPerGroup: 1,
    answerCount: 4,
    groupQuestion: 30,
    start: 101,
  },
  Part6: {
    questionCount: 16,
    questionPerGroup: 4,
    answerCount: 4,
    groupQuestion: 4,
    start: 131,
  },
  Part7: {
    questionCount: 54,
  },
};
