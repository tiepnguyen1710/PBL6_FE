import VocabularyModel from "./VocabularyModel";

export default interface LessonModel {
  id: string;
  name: string;
  thumbnail: string;
  __listWord__: VocabularyModel[];
}
