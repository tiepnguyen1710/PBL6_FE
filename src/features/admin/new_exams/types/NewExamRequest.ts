import { partData } from "./examType";

export default interface NewExamRequest {
  name: string;
  tag?: string;
  partData: partData[];
}
