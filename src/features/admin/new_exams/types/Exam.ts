import { partData } from "./examType";

export interface IExamModel {
  id: string;
  name: string;
  tag: string;
  time: number;
  taken: number;
  partData: partData[];
}

export interface IExamSetResponse {
  first: number;
  last: number;
  limit: number;
  total: number;
  data: IExamModel[];
}
