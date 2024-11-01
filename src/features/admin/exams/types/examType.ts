export interface partData {
  part: string;
  groupQuestionData: groupQuestionData[];
}

export interface groupQuestionData {
  audio?: File | null;
  audioPreview?: string;
  image?: File[];
  imagePreview?: string[];
  passage: string;
  questionData: questionData[];
}

export interface questionData {
  number: number;
  question: string;
  answer: string[];
  // optionA?: string;
  // optionB?: string;
  // optionC?: string;
  // optionD?: string;
}

export const TOEIC_PARTS = {
  Part1: {
    questionCount: 6,
    questionPerGroup: 1,
    answerCount: 4,
  },
  Part2: {
    questionCount: 25,
    questionPerGroup: 1,
    answerCount: 3,
  },
  Part3: {
    questionCount: 39,
    questionPerGroup: 3,
    answerCount: 4,
  },
  Part4: {
    questionCount: 30,
    questionPerGroup: 3,
    answerCount: 4,
  },
  Part5: {
    questionCount: 30,
    questionPerGroup: 1,
    answerCount: 4,
  },
  Part6: {
    questionCount: 16,
    questionPerGroup: 4,
    answerCount: 4,
  },
  Part7: {
    questionCount: 54,
  },
};
