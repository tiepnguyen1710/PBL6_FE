import VocabularyModel from "./VocabularyModel";
import VocaSetModel from "./VocaSetModel";

export default interface LessonModel {
  id: string;
  name: string;
  thumbnail: string;
  __listWord__: VocabularyModel[];
  __groupTopic__: VocaSetModel;
}
