import { Tag } from "./Tags";

export interface ExamSetInfo {
  id: string;
  name: string;
  time: number;
  tag?: Tag;
}
