export interface PracticeRequest {
  userId: string;
  testId: string;
  time: number;
  userAnswer: { idQuestion: string; answer: string }[];
}
