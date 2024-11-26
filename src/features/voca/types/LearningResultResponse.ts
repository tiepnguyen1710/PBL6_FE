import VocabularyModel from "../../../types/VocabularyModel";

export type LearningResult = {
  id: string;
  numCorrect: number;
  totalWord: number;
  time: number;
  __topic__: {
    id: string;
    name: string;
    thumbnail: string;
  };
  __correctWord__: VocabularyModel[];
  __incorrectWord__: VocabularyModel[];
};

export type LearningResultResponse = {
  current: LearningResult;
  last: LearningResult;
  max: LearningResult;
};
