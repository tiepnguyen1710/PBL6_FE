import LessonModel from "./LessonModel";

export default interface VocaSetModel {
  id: string;
  name: string;
  level: string;
  thumbnail: string;
  __topics__: LessonModel[];
}
