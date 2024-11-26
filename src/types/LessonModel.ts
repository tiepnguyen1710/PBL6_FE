import VocabularyModel from "./VocabularyModel";
import VocaSetModel from "./VocaSetModel";

export default interface LessonModel {
  id: string;
  name: string;
  thumbnail: string;
  listWord: VocabularyModel[];
  groupTopic: VocaSetModel;
}

export interface LessonWithUserProgress extends LessonModel {
  isLearned: boolean;
  retainedWord: number;
}
