import { partData } from "./examType";

export default interface NewExamRequest {
  name: string;
  tag: { id: number; name: string };
  partData: partData[];
}
