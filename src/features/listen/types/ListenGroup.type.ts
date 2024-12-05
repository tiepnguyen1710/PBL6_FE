import { IListenLession } from "./ListenLession.type";

export interface IListenGroupResponse {
  first: number;
  last: number;
  limit: number;
  total: number;
  data: IListenGroupModel[];
}

export interface IListenGroupModel {
  id: string;
  name: string;
  level: string;
  listenLessions: IListenLession[];
}

export interface IListenGroupSetInfor {
  id: string;
  name: string;
  level: string;
  listenLessions: IListenLessionSetInfor[];
}

interface IListenLessionSetInfor {
  id: string;
  name: string;
}
