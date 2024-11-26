import LessonModel, { LessonWithUserProgress } from "./LessonModel";

export default interface VocaSetModel {
  id: string;
  name: string;
  level: string;
  thumbnail: string;
  target: string;
  description: string;

  __topics__: LessonModel[];
}

export interface VocaSetWithUserProgress extends VocaSetModel {
  __topics__: LessonWithUserProgress[];
}
